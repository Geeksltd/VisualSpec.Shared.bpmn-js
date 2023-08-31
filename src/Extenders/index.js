import VerticalParticipantRenderer from './VerticalParticipantRenderer';
import ExElementFactory from './ExElementFactory';
import './ExPaletteProvider';
import './ExLabelEditingProvider';
import ExContextPadProvider from './ExContextPadProvider';

export default {
  __init__: [ 'verticalParticipantRenderer','ExElementFactory','ExContextPadProvider'],
  verticalParticipantRenderer: [ 'type', VerticalParticipantRenderer ],
  ExElementFactory: [ 'type', ExElementFactory ],
  ExContextPadProvider: [ 'type', ExContextPadProvider ]
};
