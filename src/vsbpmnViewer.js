import readonlyExtenders from './ReadonlyExtenders';
import BpmnZoomModule from './Extenders/BpmnZoomModule';
import BpmnViewer from 'bpmn-js';
import zoomScroll from 'diagram-js/lib/navigation/zoomscroll';
import MoveCanvas from 'diagram-js/lib/navigation/movecanvas';

export default class vsbpmnViewer{
 
    constructor(element,persistStateName,fullScreenElementSelector){
      //if (!vsbpmn.modeler)
      let a = readonlyExtenders;
      this.viewer = new BpmnViewer({container: '#'+element,additionalModules:[[].concat(zoomScroll,readonlyExtenders,MoveCanvas)]});
          this.zoomModule = new BpmnZoomModule(this.viewer,this.viewer.get("eventBus"),document.getElementById(element),null,persistStateName,fullScreenElementSelector);
          this.zoomModule.Render();
    }

    loadXml = async function(xmlData){
      const _self = this;
      this._isFirstTime = false;
      if (!xmlData)
        throw new Error("xmlData cannot be null");
     return this.viewer.importXML(xmlData).catch((err) => {
      if (err) {
        console.error(err);
      }
      })
       .then(()=>
        _self.zoomModule.SetDefaultZoom());
    }

   
}