import BpmnModeler from 'bpmn-js/lib/Modeler';

import verticalParticipantRendererModule from './CustomRenderer';
import ExElementFactoryModule from './CustomRenderer';

import ZoomModule from './CustomRenderer/ZoomRenderer';

var container = document.getElementById('js-canvas');
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
          new ZoomModule(modeler,container).render();
          if (xmlData)
            modeler.importXML(xmlData).catch((err) => {
            if (err) {
              console.error(err);
            }
          });
    }

    

}
