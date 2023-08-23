import BpmnModeler from 'bpmn-js/lib/Modeler';
import verticalParticipantRendererModule from './Extenders';
import ExElementFactoryModule from './Extenders';
import { is } from 'bpmn-js/lib/util/ModelUtil';
import BpmnZoomModule from './Extenders/ZoomRenderer';

export default class vsbpmn{
 
    constructor(element){
        this.modeler = new BpmnModeler({
            container: element,
            // keyboard: {
            //   bindTo: window
            // },
            additionalModules: [
              verticalParticipantRendererModule,
              ExElementFactoryModule
            ]
          });
          this.eventBus = this.modeler.get("eventBus");
          this.elementFactory = this.modeler.get("elementFactory");
          this.modeling = this.modeler.get("modeling");
          new BpmnZoomModule(this.modeler,element).render();
         
          this.elementRegistry = this.modeler.get("elementRegistry");
    }

    loadXml = async function(xmlData){
      if (!xmlData)
      throw new Error("xmlData cannot be null");
     return this.modeler.importXML(xmlData).catch((err) => {
      if (err) {
        console.error(err);
      }
      });
    }

    createWorkflowModelParticipant = function(title,actorID,integrationID)
    {
        let colaborations;
        let process = this.elementRegistry.get("Process_1")
        if (!process)
           colaborations = this.elementRegistry.filter(function(element){ return is(element,"bpmn:Collaboration") });
        const participant = this.elementFactory.createParticipantShape({ type: 'bpmn:Participant' });
     this.modeling.createShape(participant, { x: 400, y: 100 }, process ? process : colaborations[0]);
        this.modeling.updateProperties(participant,{name: title});
        if (actorID)
          this.modeling.updateProperties(participant,{actorID: actorID});
        if (integrationID)
          this.modeling.updateProperties(participant,{integrationID: integrationID});
    }   
}
