(self.webpackChunktvf_nextjs_base=self.webpackChunktvf_nextjs_base||[]).push([[458],{"./node_modules/.pnpm/@radix-ui+number@1.1.0/node_modules/@radix-ui/number/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function clamp(value,[min,max]){return Math.min(max,Math.max(min,value))}__webpack_require__.d(__webpack_exports__,{q:()=>clamp})},"./node_modules/.pnpm/@radix-ui+react-direction@1.1.0_@types+react@19.0.6_react@19.0.0/node_modules/@radix-ui/react-direction/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{jH:()=>useDirection});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@15.1.4_@babel+core@7.26.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react/index.js"),DirectionContext=(__webpack_require__("./node_modules/.pnpm/next@15.1.4_@babel+core@7.26.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_0__.createContext(void 0));function useDirection(localDir){const globalDir=react__WEBPACK_IMPORTED_MODULE_0__.useContext(DirectionContext);return localDir||globalDir||"ltr"}},"./node_modules/.pnpm/@radix-ui+react-scroll-area@1.2.2_@types+react-dom@19.0.3_@types+react@19.0.6__@types+react@1_xrd3owgyg6kdzstici5urs4yne/node_modules/@radix-ui/react-scroll-area/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{LM:()=>Viewport,OK:()=>Corner,VM:()=>ScrollAreaScrollbar,bL:()=>Root,lr:()=>ScrollAreaThumb});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@15.1.4_@babel+core@7.26.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react/index.js"),_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/.pnpm/@radix-ui+react-primitive@2.0.1_@types+react-dom@19.0.3_@types+react@19.0.6__@types+react@19._eyzesmtamvdd4rvmarkfribp7y/node_modules/@radix-ui/react-primitive/dist/index.mjs"),_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/.pnpm/@radix-ui+react-presence@1.1.2_@types+react-dom@19.0.3_@types+react@19.0.6__@types+react@19.0_x64ifmirv3hilnerhlohpctj4m/node_modules/@radix-ui/react-presence/dist/index.mjs"),_radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/.pnpm/@radix-ui+react-context@1.1.1_@types+react@19.0.6_react@19.0.0/node_modules/@radix-ui/react-context/dist/index.mjs"),_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/.pnpm/@radix-ui+react-compose-refs@1.1.1_@types+react@19.0.6_react@19.0.0/node_modules/@radix-ui/react-compose-refs/dist/index.mjs"),_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/.pnpm/@radix-ui+react-use-callback-ref@1.1.0_@types+react@19.0.6_react@19.0.0/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs"),_radix_ui_react_direction__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/.pnpm/@radix-ui+react-direction@1.1.0_@types+react@19.0.6_react@19.0.0/node_modules/@radix-ui/react-direction/dist/index.mjs"),_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/.pnpm/@radix-ui+react-use-layout-effect@1.1.0_@types+react@19.0.6_react@19.0.0/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs"),_radix_ui_number__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/.pnpm/@radix-ui+number@1.1.0/node_modules/@radix-ui/number/dist/index.mjs"),_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/.pnpm/@radix-ui+primitive@1.1.1/node_modules/@radix-ui/primitive/dist/index.mjs"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/next@15.1.4_@babel+core@7.26.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react/jsx-runtime.js");var[createScrollAreaContext,createScrollAreaScope]=(0,_radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__.A)("ScrollArea"),[ScrollAreaProvider,useScrollAreaContext]=createScrollAreaContext("ScrollArea"),ScrollArea=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((props,forwardedRef)=>{const{__scopeScrollArea,type="hover",dir,scrollHideDelay=600,...scrollAreaProps}=props,[scrollArea,setScrollArea]=react__WEBPACK_IMPORTED_MODULE_0__.useState(null),[viewport,setViewport]=react__WEBPACK_IMPORTED_MODULE_0__.useState(null),[content,setContent]=react__WEBPACK_IMPORTED_MODULE_0__.useState(null),[scrollbarX,setScrollbarX]=react__WEBPACK_IMPORTED_MODULE_0__.useState(null),[scrollbarY,setScrollbarY]=react__WEBPACK_IMPORTED_MODULE_0__.useState(null),[cornerWidth,setCornerWidth]=react__WEBPACK_IMPORTED_MODULE_0__.useState(0),[cornerHeight,setCornerHeight]=react__WEBPACK_IMPORTED_MODULE_0__.useState(0),[scrollbarXEnabled,setScrollbarXEnabled]=react__WEBPACK_IMPORTED_MODULE_0__.useState(!1),[scrollbarYEnabled,setScrollbarYEnabled]=react__WEBPACK_IMPORTED_MODULE_0__.useState(!1),composedRefs=(0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_3__.s)(forwardedRef,(node=>setScrollArea(node))),direction=(0,_radix_ui_react_direction__WEBPACK_IMPORTED_MODULE_4__.jH)(dir);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollAreaProvider,{scope:__scopeScrollArea,type,dir:direction,scrollHideDelay,scrollArea,viewport,onViewportChange:setViewport,content,onContentChange:setContent,scrollbarX,onScrollbarXChange:setScrollbarX,scrollbarXEnabled,onScrollbarXEnabledChange:setScrollbarXEnabled,scrollbarY,onScrollbarYChange:setScrollbarY,scrollbarYEnabled,onScrollbarYEnabledChange:setScrollbarYEnabled,onCornerWidthChange:setCornerWidth,onCornerHeightChange:setCornerHeight,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_5__.sG.div,{dir:direction,...scrollAreaProps,ref:composedRefs,style:{position:"relative","--radix-scroll-area-corner-width":cornerWidth+"px","--radix-scroll-area-corner-height":cornerHeight+"px",...props.style}})})}));ScrollArea.displayName="ScrollArea";var ScrollAreaViewport=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((props,forwardedRef)=>{const{__scopeScrollArea,children,nonce,...viewportProps}=props,context=useScrollAreaContext("ScrollAreaViewport",__scopeScrollArea),ref=react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),composedRefs=(0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_3__.s)(forwardedRef,ref,context.onViewportChange);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("style",{dangerouslySetInnerHTML:{__html:"[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}"},nonce}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_5__.sG.div,{"data-radix-scroll-area-viewport":"",...viewportProps,ref:composedRefs,style:{overflowX:context.scrollbarXEnabled?"scroll":"hidden",overflowY:context.scrollbarYEnabled?"scroll":"hidden",...props.style},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{ref:context.onContentChange,style:{minWidth:"100%",display:"table"},children})})]})}));ScrollAreaViewport.displayName="ScrollAreaViewport";var SCROLLBAR_NAME="ScrollAreaScrollbar",ScrollAreaScrollbar=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((props,forwardedRef)=>{const{forceMount,...scrollbarProps}=props,context=useScrollAreaContext(SCROLLBAR_NAME,props.__scopeScrollArea),{onScrollbarXEnabledChange,onScrollbarYEnabledChange}=context,isHorizontal="horizontal"===props.orientation;return react__WEBPACK_IMPORTED_MODULE_0__.useEffect((()=>(isHorizontal?onScrollbarXEnabledChange(!0):onScrollbarYEnabledChange(!0),()=>{isHorizontal?onScrollbarXEnabledChange(!1):onScrollbarYEnabledChange(!1)})),[isHorizontal,onScrollbarXEnabledChange,onScrollbarYEnabledChange]),"hover"===context.type?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollAreaScrollbarHover,{...scrollbarProps,ref:forwardedRef,forceMount}):"scroll"===context.type?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollAreaScrollbarScroll,{...scrollbarProps,ref:forwardedRef,forceMount}):"auto"===context.type?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollAreaScrollbarAuto,{...scrollbarProps,ref:forwardedRef,forceMount}):"always"===context.type?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollAreaScrollbarVisible,{...scrollbarProps,ref:forwardedRef}):null}));ScrollAreaScrollbar.displayName=SCROLLBAR_NAME;var ScrollAreaScrollbarHover=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((props,forwardedRef)=>{const{forceMount,...scrollbarProps}=props,context=useScrollAreaContext(SCROLLBAR_NAME,props.__scopeScrollArea),[visible,setVisible]=react__WEBPACK_IMPORTED_MODULE_0__.useState(!1);return react__WEBPACK_IMPORTED_MODULE_0__.useEffect((()=>{const scrollArea=context.scrollArea;let hideTimer=0;if(scrollArea){const handlePointerEnter=()=>{window.clearTimeout(hideTimer),setVisible(!0)},handlePointerLeave=()=>{hideTimer=window.setTimeout((()=>setVisible(!1)),context.scrollHideDelay)};return scrollArea.addEventListener("pointerenter",handlePointerEnter),scrollArea.addEventListener("pointerleave",handlePointerLeave),()=>{window.clearTimeout(hideTimer),scrollArea.removeEventListener("pointerenter",handlePointerEnter),scrollArea.removeEventListener("pointerleave",handlePointerLeave)}}}),[context.scrollArea,context.scrollHideDelay]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_6__.C,{present:forceMount||visible,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollAreaScrollbarAuto,{"data-state":visible?"visible":"hidden",...scrollbarProps,ref:forwardedRef})})})),ScrollAreaScrollbarScroll=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((props,forwardedRef)=>{const{forceMount,...scrollbarProps}=props,context=useScrollAreaContext(SCROLLBAR_NAME,props.__scopeScrollArea),isHorizontal="horizontal"===props.orientation,debounceScrollEnd=useDebounceCallback((()=>send("SCROLL_END")),100),[state,send]=function useStateMachine(initialState,machine){return react__WEBPACK_IMPORTED_MODULE_0__.useReducer(((state,event)=>machine[state][event]??state),initialState)}("hidden",{hidden:{SCROLL:"scrolling"},scrolling:{SCROLL_END:"idle",POINTER_ENTER:"interacting"},interacting:{SCROLL:"interacting",POINTER_LEAVE:"idle"},idle:{HIDE:"hidden",SCROLL:"scrolling",POINTER_ENTER:"interacting"}});return react__WEBPACK_IMPORTED_MODULE_0__.useEffect((()=>{if("idle"===state){const hideTimer=window.setTimeout((()=>send("HIDE")),context.scrollHideDelay);return()=>window.clearTimeout(hideTimer)}}),[state,context.scrollHideDelay,send]),react__WEBPACK_IMPORTED_MODULE_0__.useEffect((()=>{const viewport=context.viewport,scrollDirection=isHorizontal?"scrollLeft":"scrollTop";if(viewport){let prevScrollPos=viewport[scrollDirection];const handleScroll=()=>{const scrollPos=viewport[scrollDirection];prevScrollPos!==scrollPos&&(send("SCROLL"),debounceScrollEnd()),prevScrollPos=scrollPos};return viewport.addEventListener("scroll",handleScroll),()=>viewport.removeEventListener("scroll",handleScroll)}}),[context.viewport,isHorizontal,send,debounceScrollEnd]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_6__.C,{present:forceMount||"hidden"!==state,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollAreaScrollbarVisible,{"data-state":"hidden"===state?"hidden":"visible",...scrollbarProps,ref:forwardedRef,onPointerEnter:(0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_7__.m)(props.onPointerEnter,(()=>send("POINTER_ENTER"))),onPointerLeave:(0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_7__.m)(props.onPointerLeave,(()=>send("POINTER_LEAVE")))})})})),ScrollAreaScrollbarAuto=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((props,forwardedRef)=>{const context=useScrollAreaContext(SCROLLBAR_NAME,props.__scopeScrollArea),{forceMount,...scrollbarProps}=props,[visible,setVisible]=react__WEBPACK_IMPORTED_MODULE_0__.useState(!1),isHorizontal="horizontal"===props.orientation,handleResize=useDebounceCallback((()=>{if(context.viewport){const isOverflowX=context.viewport.offsetWidth<context.viewport.scrollWidth,isOverflowY=context.viewport.offsetHeight<context.viewport.scrollHeight;setVisible(isHorizontal?isOverflowX:isOverflowY)}}),10);return useResizeObserver(context.viewport,handleResize),useResizeObserver(context.content,handleResize),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_6__.C,{present:forceMount||visible,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollAreaScrollbarVisible,{"data-state":visible?"visible":"hidden",...scrollbarProps,ref:forwardedRef})})})),ScrollAreaScrollbarVisible=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((props,forwardedRef)=>{const{orientation="vertical",...scrollbarProps}=props,context=useScrollAreaContext(SCROLLBAR_NAME,props.__scopeScrollArea),thumbRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),pointerOffsetRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(0),[sizes,setSizes]=react__WEBPACK_IMPORTED_MODULE_0__.useState({content:0,viewport:0,scrollbar:{size:0,paddingStart:0,paddingEnd:0}}),thumbRatio=getThumbRatio(sizes.viewport,sizes.content),commonProps={...scrollbarProps,sizes,onSizesChange:setSizes,hasThumb:Boolean(thumbRatio>0&&thumbRatio<1),onThumbChange:thumb=>thumbRef.current=thumb,onThumbPointerUp:()=>pointerOffsetRef.current=0,onThumbPointerDown:pointerPos=>pointerOffsetRef.current=pointerPos};function getScrollPosition(pointerPos,dir){return function getScrollPositionFromPointer(pointerPos,pointerOffset,sizes,dir="ltr"){const thumbSizePx=getThumbSize(sizes),thumbCenter=thumbSizePx/2,offset=pointerOffset||thumbCenter,thumbOffsetFromEnd=thumbSizePx-offset,minPointerPos=sizes.scrollbar.paddingStart+offset,maxPointerPos=sizes.scrollbar.size-sizes.scrollbar.paddingEnd-thumbOffsetFromEnd,maxScrollPos=sizes.content-sizes.viewport,scrollRange="ltr"===dir?[0,maxScrollPos]:[-1*maxScrollPos,0];return linearScale([minPointerPos,maxPointerPos],scrollRange)(pointerPos)}(pointerPos,pointerOffsetRef.current,sizes,dir)}return"horizontal"===orientation?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollAreaScrollbarX,{...commonProps,ref:forwardedRef,onThumbPositionChange:()=>{if(context.viewport&&thumbRef.current){const offset=getThumbOffsetFromScroll(context.viewport.scrollLeft,sizes,context.dir);thumbRef.current.style.transform=`translate3d(${offset}px, 0, 0)`}},onWheelScroll:scrollPos=>{context.viewport&&(context.viewport.scrollLeft=scrollPos)},onDragScroll:pointerPos=>{context.viewport&&(context.viewport.scrollLeft=getScrollPosition(pointerPos,context.dir))}}):"vertical"===orientation?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollAreaScrollbarY,{...commonProps,ref:forwardedRef,onThumbPositionChange:()=>{if(context.viewport&&thumbRef.current){const offset=getThumbOffsetFromScroll(context.viewport.scrollTop,sizes);thumbRef.current.style.transform=`translate3d(0, ${offset}px, 0)`}},onWheelScroll:scrollPos=>{context.viewport&&(context.viewport.scrollTop=scrollPos)},onDragScroll:pointerPos=>{context.viewport&&(context.viewport.scrollTop=getScrollPosition(pointerPos))}}):null})),ScrollAreaScrollbarX=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((props,forwardedRef)=>{const{sizes,onSizesChange,...scrollbarProps}=props,context=useScrollAreaContext(SCROLLBAR_NAME,props.__scopeScrollArea),[computedStyle,setComputedStyle]=react__WEBPACK_IMPORTED_MODULE_0__.useState(),ref=react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),composeRefs=(0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_3__.s)(forwardedRef,ref,context.onScrollbarXChange);return react__WEBPACK_IMPORTED_MODULE_0__.useEffect((()=>{ref.current&&setComputedStyle(getComputedStyle(ref.current))}),[ref]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollAreaScrollbarImpl,{"data-orientation":"horizontal",...scrollbarProps,ref:composeRefs,sizes,style:{bottom:0,left:"rtl"===context.dir?"var(--radix-scroll-area-corner-width)":0,right:"ltr"===context.dir?"var(--radix-scroll-area-corner-width)":0,"--radix-scroll-area-thumb-width":getThumbSize(sizes)+"px",...props.style},onThumbPointerDown:pointerPos=>props.onThumbPointerDown(pointerPos.x),onDragScroll:pointerPos=>props.onDragScroll(pointerPos.x),onWheelScroll:(event,maxScrollPos)=>{if(context.viewport){const scrollPos=context.viewport.scrollLeft+event.deltaX;props.onWheelScroll(scrollPos),isScrollingWithinScrollbarBounds(scrollPos,maxScrollPos)&&event.preventDefault()}},onResize:()=>{ref.current&&context.viewport&&computedStyle&&onSizesChange({content:context.viewport.scrollWidth,viewport:context.viewport.offsetWidth,scrollbar:{size:ref.current.clientWidth,paddingStart:toInt(computedStyle.paddingLeft),paddingEnd:toInt(computedStyle.paddingRight)}})}})})),ScrollAreaScrollbarY=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((props,forwardedRef)=>{const{sizes,onSizesChange,...scrollbarProps}=props,context=useScrollAreaContext(SCROLLBAR_NAME,props.__scopeScrollArea),[computedStyle,setComputedStyle]=react__WEBPACK_IMPORTED_MODULE_0__.useState(),ref=react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),composeRefs=(0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_3__.s)(forwardedRef,ref,context.onScrollbarYChange);return react__WEBPACK_IMPORTED_MODULE_0__.useEffect((()=>{ref.current&&setComputedStyle(getComputedStyle(ref.current))}),[ref]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollAreaScrollbarImpl,{"data-orientation":"vertical",...scrollbarProps,ref:composeRefs,sizes,style:{top:0,right:"ltr"===context.dir?0:void 0,left:"rtl"===context.dir?0:void 0,bottom:"var(--radix-scroll-area-corner-height)","--radix-scroll-area-thumb-height":getThumbSize(sizes)+"px",...props.style},onThumbPointerDown:pointerPos=>props.onThumbPointerDown(pointerPos.y),onDragScroll:pointerPos=>props.onDragScroll(pointerPos.y),onWheelScroll:(event,maxScrollPos)=>{if(context.viewport){const scrollPos=context.viewport.scrollTop+event.deltaY;props.onWheelScroll(scrollPos),isScrollingWithinScrollbarBounds(scrollPos,maxScrollPos)&&event.preventDefault()}},onResize:()=>{ref.current&&context.viewport&&computedStyle&&onSizesChange({content:context.viewport.scrollHeight,viewport:context.viewport.offsetHeight,scrollbar:{size:ref.current.clientHeight,paddingStart:toInt(computedStyle.paddingTop),paddingEnd:toInt(computedStyle.paddingBottom)}})}})})),[ScrollbarProvider,useScrollbarContext]=createScrollAreaContext(SCROLLBAR_NAME),ScrollAreaScrollbarImpl=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((props,forwardedRef)=>{const{__scopeScrollArea,sizes,hasThumb,onThumbChange,onThumbPointerUp,onThumbPointerDown,onThumbPositionChange,onDragScroll,onWheelScroll,onResize,...scrollbarProps}=props,context=useScrollAreaContext(SCROLLBAR_NAME,__scopeScrollArea),[scrollbar,setScrollbar]=react__WEBPACK_IMPORTED_MODULE_0__.useState(null),composeRefs=(0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_3__.s)(forwardedRef,(node=>setScrollbar(node))),rectRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),prevWebkitUserSelectRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(""),viewport=context.viewport,maxScrollPos=sizes.content-sizes.viewport,handleWheelScroll=(0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_8__.c)(onWheelScroll),handleThumbPositionChange=(0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_8__.c)(onThumbPositionChange),handleResize=useDebounceCallback(onResize,10);function handleDragScroll(event){if(rectRef.current){const x=event.clientX-rectRef.current.left,y=event.clientY-rectRef.current.top;onDragScroll({x,y})}}return react__WEBPACK_IMPORTED_MODULE_0__.useEffect((()=>{const handleWheel=event=>{const element=event.target,isScrollbarWheel=scrollbar?.contains(element);isScrollbarWheel&&handleWheelScroll(event,maxScrollPos)};return document.addEventListener("wheel",handleWheel,{passive:!1}),()=>document.removeEventListener("wheel",handleWheel,{passive:!1})}),[viewport,scrollbar,maxScrollPos,handleWheelScroll]),react__WEBPACK_IMPORTED_MODULE_0__.useEffect(handleThumbPositionChange,[sizes,handleThumbPositionChange]),useResizeObserver(scrollbar,handleResize),useResizeObserver(context.content,handleResize),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollbarProvider,{scope:__scopeScrollArea,scrollbar,hasThumb,onThumbChange:(0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_8__.c)(onThumbChange),onThumbPointerUp:(0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_8__.c)(onThumbPointerUp),onThumbPositionChange:handleThumbPositionChange,onThumbPointerDown:(0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_8__.c)(onThumbPointerDown),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_5__.sG.div,{...scrollbarProps,ref:composeRefs,style:{position:"absolute",...scrollbarProps.style},onPointerDown:(0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_7__.m)(props.onPointerDown,(event=>{if(0===event.button){event.target.setPointerCapture(event.pointerId),rectRef.current=scrollbar.getBoundingClientRect(),prevWebkitUserSelectRef.current=document.body.style.webkitUserSelect,document.body.style.webkitUserSelect="none",context.viewport&&(context.viewport.style.scrollBehavior="auto"),handleDragScroll(event)}})),onPointerMove:(0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_7__.m)(props.onPointerMove,handleDragScroll),onPointerUp:(0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_7__.m)(props.onPointerUp,(event=>{const element=event.target;element.hasPointerCapture(event.pointerId)&&element.releasePointerCapture(event.pointerId),document.body.style.webkitUserSelect=prevWebkitUserSelectRef.current,context.viewport&&(context.viewport.style.scrollBehavior=""),rectRef.current=null}))})})})),ScrollAreaThumb=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((props,forwardedRef)=>{const{forceMount,...thumbProps}=props,scrollbarContext=useScrollbarContext("ScrollAreaThumb",props.__scopeScrollArea);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_6__.C,{present:forceMount||scrollbarContext.hasThumb,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollAreaThumbImpl,{ref:forwardedRef,...thumbProps})})})),ScrollAreaThumbImpl=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((props,forwardedRef)=>{const{__scopeScrollArea,style,...thumbProps}=props,scrollAreaContext=useScrollAreaContext("ScrollAreaThumb",__scopeScrollArea),scrollbarContext=useScrollbarContext("ScrollAreaThumb",__scopeScrollArea),{onThumbPositionChange}=scrollbarContext,composedRef=(0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_3__.s)(forwardedRef,(node=>scrollbarContext.onThumbChange(node))),removeUnlinkedScrollListenerRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(void 0),debounceScrollEnd=useDebounceCallback((()=>{removeUnlinkedScrollListenerRef.current&&(removeUnlinkedScrollListenerRef.current(),removeUnlinkedScrollListenerRef.current=void 0)}),100);return react__WEBPACK_IMPORTED_MODULE_0__.useEffect((()=>{const viewport=scrollAreaContext.viewport;if(viewport){const handleScroll=()=>{if(debounceScrollEnd(),!removeUnlinkedScrollListenerRef.current){const listener=addUnlinkedScrollListener(viewport,onThumbPositionChange);removeUnlinkedScrollListenerRef.current=listener,onThumbPositionChange()}};return onThumbPositionChange(),viewport.addEventListener("scroll",handleScroll),()=>viewport.removeEventListener("scroll",handleScroll)}}),[scrollAreaContext.viewport,debounceScrollEnd,onThumbPositionChange]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_5__.sG.div,{"data-state":scrollbarContext.hasThumb?"visible":"hidden",...thumbProps,ref:composedRef,style:{width:"var(--radix-scroll-area-thumb-width)",height:"var(--radix-scroll-area-thumb-height)",...style},onPointerDownCapture:(0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_7__.m)(props.onPointerDownCapture,(event=>{const thumbRect=event.target.getBoundingClientRect(),x=event.clientX-thumbRect.left,y=event.clientY-thumbRect.top;scrollbarContext.onThumbPointerDown({x,y})})),onPointerUp:(0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_7__.m)(props.onPointerUp,scrollbarContext.onThumbPointerUp)})}));ScrollAreaThumb.displayName="ScrollAreaThumb";var ScrollAreaCorner=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((props,forwardedRef)=>{const context=useScrollAreaContext("ScrollAreaCorner",props.__scopeScrollArea),hasBothScrollbarsVisible=Boolean(context.scrollbarX&&context.scrollbarY);return"scroll"!==context.type&&hasBothScrollbarsVisible?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollAreaCornerImpl,{...props,ref:forwardedRef}):null}));ScrollAreaCorner.displayName="ScrollAreaCorner";var ScrollAreaCornerImpl=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((props,forwardedRef)=>{const{__scopeScrollArea,...cornerProps}=props,context=useScrollAreaContext("ScrollAreaCorner",__scopeScrollArea),[width,setWidth]=react__WEBPACK_IMPORTED_MODULE_0__.useState(0),[height,setHeight]=react__WEBPACK_IMPORTED_MODULE_0__.useState(0),hasSize=Boolean(width&&height);return useResizeObserver(context.scrollbarX,(()=>{const height2=context.scrollbarX?.offsetHeight||0;context.onCornerHeightChange(height2),setHeight(height2)})),useResizeObserver(context.scrollbarY,(()=>{const width2=context.scrollbarY?.offsetWidth||0;context.onCornerWidthChange(width2),setWidth(width2)})),hasSize?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_5__.sG.div,{...cornerProps,ref:forwardedRef,style:{width,height,position:"absolute",right:"ltr"===context.dir?0:void 0,left:"rtl"===context.dir?0:void 0,bottom:0,...props.style}}):null}));function toInt(value){return value?parseInt(value,10):0}function getThumbRatio(viewportSize,contentSize){const ratio=viewportSize/contentSize;return isNaN(ratio)?0:ratio}function getThumbSize(sizes){const ratio=getThumbRatio(sizes.viewport,sizes.content),scrollbarPadding=sizes.scrollbar.paddingStart+sizes.scrollbar.paddingEnd,thumbSize=(sizes.scrollbar.size-scrollbarPadding)*ratio;return Math.max(thumbSize,18)}function getThumbOffsetFromScroll(scrollPos,sizes,dir="ltr"){const thumbSizePx=getThumbSize(sizes),scrollbarPadding=sizes.scrollbar.paddingStart+sizes.scrollbar.paddingEnd,scrollbar=sizes.scrollbar.size-scrollbarPadding,maxScrollPos=sizes.content-sizes.viewport,maxThumbPos=scrollbar-thumbSizePx,scrollClampRange="ltr"===dir?[0,maxScrollPos]:[-1*maxScrollPos,0],scrollWithoutMomentum=(0,_radix_ui_number__WEBPACK_IMPORTED_MODULE_9__.q)(scrollPos,scrollClampRange);return linearScale([0,maxScrollPos],[0,maxThumbPos])(scrollWithoutMomentum)}function linearScale(input,output){return value=>{if(input[0]===input[1]||output[0]===output[1])return output[0];const ratio=(output[1]-output[0])/(input[1]-input[0]);return output[0]+ratio*(value-input[0])}}function isScrollingWithinScrollbarBounds(scrollPos,maxScrollPos){return scrollPos>0&&scrollPos<maxScrollPos}var addUnlinkedScrollListener=(node,handler=()=>{})=>{let prevPosition={left:node.scrollLeft,top:node.scrollTop},rAF=0;return function loop(){const position={left:node.scrollLeft,top:node.scrollTop},isHorizontalScroll=prevPosition.left!==position.left,isVerticalScroll=prevPosition.top!==position.top;(isHorizontalScroll||isVerticalScroll)&&handler(),prevPosition=position,rAF=window.requestAnimationFrame(loop)}(),()=>window.cancelAnimationFrame(rAF)};function useDebounceCallback(callback,delay){const handleCallback=(0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_8__.c)(callback),debounceTimerRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(0);return react__WEBPACK_IMPORTED_MODULE_0__.useEffect((()=>()=>window.clearTimeout(debounceTimerRef.current)),[]),react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>{window.clearTimeout(debounceTimerRef.current),debounceTimerRef.current=window.setTimeout(handleCallback,delay)}),[handleCallback,delay])}function useResizeObserver(element,onResize){const handleResize=(0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_8__.c)(onResize);(0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_10__.N)((()=>{let rAF=0;if(element){const resizeObserver=new ResizeObserver((()=>{cancelAnimationFrame(rAF),rAF=window.requestAnimationFrame(handleResize)}));return resizeObserver.observe(element),()=>{window.cancelAnimationFrame(rAF),resizeObserver.unobserve(element)}}}),[element,handleResize])}var Root=ScrollArea,Viewport=ScrollAreaViewport,Corner=ScrollAreaCorner},"./node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/factoryWithThrowingShims.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var ReactPropTypesSecret=__webpack_require__("./node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/lib/ReactPropTypesSecret.js");function emptyFunction(){}function emptyFunctionWithReset(){}emptyFunctionWithReset.resetWarningCache=emptyFunction,module.exports=function(){function shim(props,propName,componentName,location,propFullName,secret){if(secret!==ReactPropTypesSecret){var err=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw err.name="Invariant Violation",err}}function getShim(){return shim}shim.isRequired=shim;var ReactPropTypes={array:shim,bigint:shim,bool:shim,func:shim,number:shim,object:shim,string:shim,symbol:shim,any:shim,arrayOf:getShim,element:shim,elementType:shim,instanceOf:getShim,node:shim,objectOf:getShim,oneOf:getShim,oneOfType:getShim,shape:getShim,exact:getShim,checkPropTypes:emptyFunctionWithReset,resetWarningCache:emptyFunction};return ReactPropTypes.PropTypes=ReactPropTypes,ReactPropTypes}},"./node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/factoryWithThrowingShims.js")()},"./node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/lib/ReactPropTypesSecret.js":module=>{"use strict";module.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}}]);