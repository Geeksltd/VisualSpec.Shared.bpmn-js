import BpmnModeler from 'bpmn-js/lib/Modeler';
import extenders from './Extenders';
import { is } from 'bpmn-js/lib/util/ModelUtil';
import BpmnZoomModule from './Extenders/ZoomRenderer';

export default class vsbpmn{
 
    constructor(element,persistStateName,fullScreenElementSelector){
        this.modeler = new BpmnModeler({
            container: element,
            keyboard: {
              bindTo: window
            },
            additionalModules: [
              extenders
            ]
          });
          this.eventBus = this.modeler.get("eventBus");
          this.elementFactory = this.modeler.get("elementFactory");
          this.modeling = this.modeler.get("modeling");
          this.zoomModule = new BpmnZoomModule(this.modeler,this.eventBus,element,null,persistStateName,fullScreenElementSelector);
          this.zoomModule.Render();
          this.elementRegistry = this.modeler.get("elementRegistry");
    }

    loadXml = async function(xmlData){
      const _self = this;
      if (!xmlData)
        throw new Error("xmlData cannot be null");
     return this.modeler.importXML(xmlData).catch((err) => {
      if (err) {
        console.error(err);
      }
      }).then(()=>
       _self.zoomModule.SetDefaultZoom());
    }

    createWorkflowModelParticipant = function(title,actorID,integrationID)
    {
        let colaborations;
        let process = this.elementRegistry.get("Process_1")
        if (!process)
           colaborations = this.elementRegistry.filter(function(element){ return is(element,"bpmn:Collaboration") });
        if (!colaborations || colaborations.length==0 )
        {
          var allProcesses = this.elementRegistry.filter(function(element){ return is(element,"bpmn:Process") });
          if (!allProcesses || allProcesses.length != 1)
             throw new Error("diagram is not valid");
          else
            process = allProcesses[0];
        }
        let bounds = this.getBounds();
        const participant = this.elementFactory.createParticipantShape({ type: 'bpmn:Participant' });
        let shape = this.modeling.createShape(participant, { x: bounds[0], y: bounds[1] }, process ? process : colaborations[0]);
        this.modeling.updateProperties(participant,{name: title});
        if (actorID)
          this.modeling.updateProperties(participant,{actorID: actorID});
        if (integrationID)
          this.modeling.updateProperties(participant,{integrationID: integrationID});
    }
    getBounds(){
      let participants = this.elementRegistry.filter(function(element){ return is(element,"bpmn:Participant") });
      if (!participants || participants.length == 0)
        return [350,250];
      else{
        let lastItem = participants.pop();
        return [lastItem.x + (lastItem.width/2) + 350 , lastItem.y + (lastItem.height/2)];
      }
    }
}
