set BASE=D:\Projects\TMF\VisualSpec.Shared.bpmn-js

echo setup diagram-js

cd %BASE%\diagram-js
npm install


echo setup bpmn-moddle

cd %BASE%\bpmn-moddle
npm install


echo prepare setup bpmn-js

mkdir %BASE%\bpmn-js\node_modules

rem link bpmn-js
mklink /D %BASE%\bpmn-js\node_modules\bpmn-moddle %BASE%\bpmn-moddle
mklink /D %BASE%\bpmn-js\node_modules\diagram-js %BASE%\diagram-js


echo setup bpmn-js

cd %BASE%\bpmn-js
npm install


cd %BASE%