ifndef PROJECT_NAME
PROJECT_NAME := ai-lab
endif

ifndef DOCKER_BIN
DOCKER_BIN := docker
endif

ifndef DOCKER_COMPOSE_BIN
DOCKER_COMPOSE_BIN := docker compose
endif

COMPOSE := PROJECT_NAME=${PROJECT_NAME} ${DOCKER_COMPOSE_BIN} -f build/compose/docker-compose.yml --env-file build/compose/.env
API_COMPOSE := ${COMPOSE} run --name ${PROJECT_NAME}_api --rm --service-ports -w /api api

build-base-image:
	$(DOCKER_BIN) build -t $(PROJECT_NAME)/backend:base -f build/api.base.Dockerfile .
	-${DOCKER_BIN} images -q -f "dangling=true" | xargs ${DOCKER_BIN} rmi -f

teardown:
	${COMPOSE} down -v
	${COMPOSE} rm --force --stop -v

setup: pg redis api-pg-migrate build-base-image
lint: api-lint web-lint

api-pg-migrate:
	${COMPOSE} run --rm pg-migrate sh -c './migrate -path /api-migrations --database $$PG_URL up'
api-pg-drops:
	${COMPOSE} run --rm pg-migrate sh -c './migrate -path /api-migrations --database $$PG_URL drop'
api-pg-force:
	@echo "Forcing migration to version ${VERSION}"
	${COMPOSE} run --rm pg-migrate sh -c './migrate -path /api-migrations --database $$PG_URL force ${VERSION}'
api-pg-goto:
	@echo "Going to migration version ${VERSION}"
	${COMPOSE} run --rm pg-migrate sh -c './migrate -path /api-migrations --database $$PG_URL goto ${VERSION}'

api-lint:
	${API_COMPOSE} sh -c 'python -m pylint cmd core internal tools'
api-run:
	${API_COMPOSE} sh -c 'python cmd/main.py'
pg:
	${COMPOSE} up -d pg
redis:
	${COMPOSE} up -d redis

node-setup:
	nvm use 20
web-lint:
	cd web && yarn lint
web-lint-fix:
	cd web && yarn lint:fix
web-run:
	cd web && yarn dev