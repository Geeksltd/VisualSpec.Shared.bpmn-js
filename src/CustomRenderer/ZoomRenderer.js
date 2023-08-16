
export default class ZoomModule{
    constructor(modeler,container,callBack){
        this.modeler = modeler;
        this.zoomScroll = this.modeler.get('zoomScroll');
        this.container = container;
        this.callBack = callBack;
        this.bypassfullscreenChanged = false;
          // Create an observer instance
          this.observer = new MutationObserver((mutationsList, observer) => {
            var _a;
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    var elem = mutation.addedNodes[0];
                    if (elem === null || elem === void 0 ? void 0 : elem.id.includes('alertify')) {
                        (_a = $(this.container)) === null || _a === void 0 ? void 0 : _a.appendChild(elem);
                    }
                }
            }
        });
    }
    render(){
        window['zoom'] = this;
        let zoomPart = document.createElement("div");
        zoomPart.classList.add("zoom-part-container");
        zoomPart.style.marginTop = "-100px";
        this.generateSetCentral(zoomPart);
        this.generateZoomIn(zoomPart);
        this.generateZoomOut(zoomPart);
        this.generateReset(zoomPart);
        this.container.appendChild(zoomPart);
    }


    generateZoomIn(container) {
        const _self = this;
        let zoomInBtn = this.generateBtn("zoom-in-btn");
        zoomInBtn.setAttribute('title', 'zoom in');
        zoomInBtn.addEventListener("click", e => 
        _self.zoomScroll.stepZoom(1));
        container.appendChild(zoomInBtn);
    }
    generateZoomOut(container) {
        const _self = this;
        let zoomInBtn = this.generateBtn("zoom-out-btn");
        zoomInBtn.setAttribute('title', 'zoom out');
        zoomInBtn.addEventListener("click", e =>  _self.zoomScroll.stepZoom(-1));
        container.appendChild(zoomInBtn);
    }
    generateSetCentral(container) {
        const _self = this;
        let zoomInBtn = this.generateBtn("zoom-central-btn");
        zoomInBtn.setAttribute('title', 'full screen');
        zoomInBtn.addEventListener("click", e => _self.fullScreenZoom(e, _self));
        container.appendChild(zoomInBtn);
    }
    generateReset(container) {
        const _self = this;
        let zoomInBtn = this.generateBtn("zoom-reset-btn");
        zoomInBtn.setAttribute('title', 'reset');
        zoomInBtn.addEventListener("click", e =>  _self.zoomScroll.reset());
        container.appendChild(zoomInBtn);
    }
    generateBtn(cssClass) {
        var btn = document.createElement("button");
        btn.classList.add(cssClass);
        var img = document.createElement("i");
        btn.appendChild(img);
        return btn;
    }
    fullScreenZoom(e, zoom) {
        e.preventDefault();
        if (zoom.container) {
            zoom.reverseFullScreen(zoom.container, zoom);
        }
    }
    reverseFullScreen(fullScreenElement, zoom) {
        if (!zoom.IsFullScreen) {
            if (document.fullscreenElement === null)
                zoom.gotoFullScreen(zoom.container, zoom);
        }
        else if (zoom.IsFullScreen) {
            if (document.exitFullscreen) {
                zoom.exitFullScreen(null);
            }
        }
    }
    gotoFullScreen(fullScreenElement, zoom) {
        if (fullScreenElement.requestFullscreen)
            fullScreenElement.requestFullscreen().catch((err) => {
                console.log(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
            }).then(() => {
                zoom.IsFullScreen = true;
                zoom.InvokeCallback(zoom, true);
                zoom.container.parentElement.setAttribute(zoom.isFullScreenAttrName, "true");
                if (zoom.sideMenu) zoom.sideMenu.style.opacity = "0";
                if (zoom.leftPanel) zoom.leftPanel.style.opacity = "0";
                zoom.bypassfullscreenChanged = true;
                document.documentElement.addEventListener('fullscreenchange', zoom.exitFullScreen);
                var target = document.querySelector('body');
                this.observer.observe(target, { childList: true, subtree: false });
            });
        //else if (fullScreenElement.webkitRequestFullscreen)
        //    fullScreenElement.webkitRequestFullscreen();
        //else if (fullScreenElement.msRequestFullscreen)/* IE11 */
        //    fullScreenElement.msRequestFullscreen();
    }
    exitFullScreen(e) {
        var _a;
        let zoom = window["zoom"];
        if (zoom.bypassfullscreenChanged) {
            zoom.bypassfullscreenChanged = false;
            return;
        }
        document.documentElement.removeEventListener('fullscreenchange', zoom.exitFullScreen);
        zoom.IsFullScreen = false;
        if (zoom.sideMenu) zoom.sideMenu.style.opacity = "1";
        if (zoom.leftPanel) zoom.leftPanel.style.opacity = "1";
        zoom.container.parentElement.removeAttribute(zoom.isFullScreenAttrName);
        zoom.InvokeCallback(zoom, true);
        document.exitFullscreen().catch(error => console.log(`Error attempting to exit fullscreen mode: ${error.message} (${error.name})`));
        (_a = this.observer) === null || _a === void 0 ? void 0 : _a.disconnect();
        // else if (document.webkitExitFullscreen)  /* Safari */
        //    document.webkitExitFullscreen();
        // else if (document.msExitFullscreen)  /* IE11 */
        //    document.msExitFullscreen();
    }
    InvokeCallback(zoom, fullScreenChanged = false) {
        if (zoom.CallBack)
            zoom.CallBack(zoom.currentState.ZoomLevel, fullScreenChanged);
    }
}