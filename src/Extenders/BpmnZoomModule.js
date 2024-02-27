
export default class BpmnZoomModule{
    constructor(modeler,eventBus,container,callBack,persistStateName,fullScreenElementSelector){
        this.modeler = modeler;
        this.zoomScroll = this.modeler.get('zoomScroll');
        this.container = container;
        this.callBack = callBack;
        this.bypassfullscreenChanged = false;
        this.persistStateName = persistStateName;
        this.stepZoom = 1;
        this.eventBus = eventBus;
        this.fullScreenElementSelector = fullScreenElementSelector;
        this.currentDim = new DiagramDimenssion(0,0);
          // Create an observer instance
          this.observer = new MutationObserver((mutationsList, observer) => {
            var _a;
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    var elem = mutation.addedNodes[0];
                    if (elem) {
                        if (elem.id.includes('alertify') || elem.classList.contains('wait-screen')) {
                            (_a = $(this.fullScreenElementSelector)) === null || _a === void 0 ? void 0 : _a.append(elem);
                        }
                    }
                }
            }
        });
    }

    Render(){
        window['bpmnZoom'] = this;
        this.canvas = this.modeler.get("canvas");
        if (this.persistStateName)
        {
            var _self = this;
            this.eventBus.on("canvas.viewbox.changed",f=>{
                const zoomModule =  window["bpmnZoom"];
                const currentZoom = zoomModule.canvas.zoom();
                if (currentZoom != zoomModule.stepZoom)
                {
                    zoomModule.stepZoom = currentZoom ;
                    localStorage.setItem( zoomModule.persistStateName+"_zoom",zoomModule.stepZoom);
                }
                else if (f.viewbox.x != zoomModule.currentDim.X || f.viewbox.x != zoomModule.currentDim.Y)
                {
                    zoomModule.currentDim.X = f.viewbox.x;
                    zoomModule.currentDim.Y = f.viewbox.y;
                    zoomModule.currentDim.Width = f.viewbox.width;
                    zoomModule.currentDim.Height = f.viewbox.height;
                    localStorage.setItem( zoomModule.persistStateName+"_dim",zoomModule.currentDim.ToString());
                }
            });
        }

        let zoomPart = document.createElement("div");
        zoomPart.classList.add("zoom-part-container");
        if (screen.height < 712)
            zoomPart.style.marginTop = "-2.5rem";
        else 
            zoomPart.style.marginTop = "-2.75rem";
        this.generateSetCentral(zoomPart);
        this.generateZoomIn(zoomPart);
        this.generateZoomOut(zoomPart);
        this.generateReset(zoomPart);
        zoomPart.style.zIndex = 9998;
        zoomPart.style.position = "relative";
        this.container.appendChild(zoomPart);
    }
    generateZoomIn(container) {
        const _self = this;
        let zoomInBtn = this.generateBtn("zoom-in-btn");
        zoomInBtn.setAttribute('title', 'zoom in');
        zoomInBtn.addEventListener("click", e => 
        _self.changeZoomStep(1));
        container.appendChild(zoomInBtn);
    }
    generateZoomOut(container) {
        const _self = this;
        let zoomInBtn = this.generateBtn("zoom-out-btn");
        zoomInBtn.setAttribute('title', 'zoom out');
        zoomInBtn.addEventListener("click", e =>  _self.changeZoomStep(-1));
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
        zoomInBtn.addEventListener("click", e =>  _self.changeZoomStep(0));
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
        let zoom = window["bpmnZoom"];
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
    changeZoomStep(step){
        if (step == 0)
        {
            this.zoomScroll.reset();
            this.canvas.zoom('fit-viewport','auto');
            localStorage.removeItem(this.persistStateName+"_zoom");
            localStorage.removeItem(this.persistStateName + "_dim");
        }
        else{
            this.zoomScroll.stepZoom(step);
            this.stepZoom = this.canvas.zoom();
            localStorage.setItem(this.persistStateName+"_zoom",this.stepZoom);
        }
    }
    SetDefaultZoom() {
       this.stepZoom = localStorage.getItem(this.persistStateName + "_zoom");
       if (this.stepZoom)
            this.canvas.zoom(this.stepZoom);
       else
            this.stepZoom = 1;
        var dim =  localStorage.getItem(this.persistStateName + "_dim");
        if (dim)
        {
            this.currentDim.Parse(dim);
            this.canvas.viewbox({x:this.currentDim.X,y:this.currentDim.Y,width:this.currentDim.Width,height:this.currentDim.Height});
        }
        else 
            this.canvas.zoom('fit-viewport','auto');
    }
    InvestigateDialog() {
        var _a, _b;
        if (!this.IsFullScreen)
            return;
        let modalElement = $(".modal.show");
        if (modalElement) {
            let fullScreenElement = $(this.fullScreenElementSelector);
            fullScreenElement === null || fullScreenElement === void 0 ? void 0 : fullScreenElement.append(modalElement);
            fullScreenElement === null || fullScreenElement === void 0 ? void 0 : fullScreenElement.append($(".modal-backdrop.show"));
            (_b = (_a = modalElement[0]) === null || _a === void 0 ? void 0 : _a.querySelector(".modal-dialog")) === null || _b === void 0 ? void 0 : _b.classList.add("modal-dialog-centered");
            let alertElement = $("#alertify");
            if (alertElement.length > 0) {
                fullScreenElement === null || fullScreenElement === void 0 ? void 0 : fullScreenElement.append(alertElement);
            }
        }
    }
}

class DiagramDimenssion
{
    constructor(x,y,width,height)
    {
        this.X = x;
        this.Y = y;
        this.Width = width;
        this.height= height;
    }

    Parse(location)
    {
        var dim = location.split(":");
        if (dim.length != 4)
            throw new Error("dimenssions is not correct");
        this.X = Number(dim[0]);
        this.Y = Number(dim[1]);
        this.Width = Number(dim[2]);
        this.Height = Number(dim[3]);
    }

     ToString()
     {
        return `${this.X}:${this.Y}:${this.Width}:${this.Height}`;
     }

}