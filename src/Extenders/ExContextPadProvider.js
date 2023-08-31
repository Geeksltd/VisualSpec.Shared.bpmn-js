
export default class ExContextPadProvider {
    constructor(contextPad) {
      contextPad.registerProvider(this);
    }
  
    getContextPadEntries(element) {
      return function(entries) {
        //delete entries["append.end-event"];
        if (entries["append.end-event"])
            entries["append.end-event"].title = "Append End Point";
        if (entries["append.start-event"])
            entries["append.start-event"].title = "Append Start Point";
        if (entries["append.gateway"])
            entries["append.gateway"].title = "Append Desicion Point";
        if (entries["append.append-task"])
            entries["append.append-task"].title = "Append Step";

        delete entries["append.intermediate-event"];
        delete entries["replace"];            
        
        if (element.type == "bpmn:Participant")
        {
            delete entries["lane-divide-three"];
            delete entries["lane-divide-two"];
            delete entries["lane-insert-above"];
            delete entries["lane-insert-below"];
        }
            

        return entries;
      };
    }
  }

  ExContextPadProvider.$inject = ["contextPad"];