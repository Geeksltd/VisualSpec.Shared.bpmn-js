import ElementFactory from 'bpmn-js/lib/features/modeling/ElementFactory'; 
import { is } from 'bpmn-js/lib/util/ModelUtil';

class ExElementFactory extends ElementFactory {
  constructor(bpmnFactory, moddle, translate, elementFactory) {
      super(bpmnFactory, moddle, translate);
      const backup_getDefaultSize = elementFactory.getDefaultSize;
      elementFactory.getDefaultSize = (element, di) => {
          if (is(element, 'bpmn:Participant')) {
              return { width: 350, height: 450};
          }
          return backup_getDefaultSize(element, di);
      }
  }
}
ExElementFactory.$inject = [
  'bpmnFactory',
  'moddle',
  'translate',
  'elementFactory'
];
export default ExElementFactory