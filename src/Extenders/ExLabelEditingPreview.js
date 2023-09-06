export default function LabelEditingPreview(eventBus, canvas, pathMap) {
     pathMap.pathMap["TEXT_ANNOTATION"].d="";
  }
  
  LabelEditingPreview.$inject = [
    'eventBus',
    'canvas',
    'pathMap'
  ];
  