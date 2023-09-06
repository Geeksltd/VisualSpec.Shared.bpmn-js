import VerticalParticipantRenderer from './VerticalParticipantRenderer';
import ExElementFactory from './ExElementFactory';
import './ExPaletteProvider';
import './ExLabelEditingProvider';
import ExContextPadProvider from './ExContextPadProvider';
import LabelEditingPreview from './ExLabelEditingPreview';

export default {
  __init__: [ 'verticalParticipantRenderer','ExElementFactory','ExContextPadProvider','LabelEditingPreview'],
  verticalParticipantRenderer: [ 'type', VerticalParticipantRenderer ],
  ExElementFactory: [ 'type', ExElementFactory ],
  ExContextPadProvider: [ 'type', ExContextPadProvider ],
  LabelEditingPreview:['type', LabelEditingPreview ]
};
