import BpmnModeler from 'bpmn-js/lib/Modeler';

import verticalParticipantRendererModule from './CustomRenderer';
import ExElementFactoryModule from './CustomRenderer';

import ZoomModule from './CustomRenderer/ZoomRenderer';

export default class vsbpmn{
    constructor(element,xmlData){
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
          //List of all events
          new ZoomModule(this.modeler,element).render();
          if (xmlData)
            this.modeler.importXML(xmlData).catch((err) => {
            if (err) {
              console.error(err);
            }
          });
    }
}
