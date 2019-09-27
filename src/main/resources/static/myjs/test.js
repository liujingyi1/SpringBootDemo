/**
 * 
 */

// initWebSocket: function(callback, errorCallback) {
//             callback = callback || function(){};
//
//             if(ws && ws.connected){
//                 return;
//             }
//
//             Config.isManCloseWs = false;
//
//             var url = Config.wsProtocol + Config.SDK + Config.eventPort + Config.eventBasePath + "/websocket";
//
//             if(typeof WebSocket != 'function'){
//                 alert('您的浏览器版本太太太老了，请升级你的浏览器到IE11，或使用任何支持原生WebSocket的浏览器');
//                 return;
//             }
//
//             try{
//                 var socket = new WebSocket(url);
//             }
//             catch(e){
//                 console.log(e);
//                 return;
//             }
//
//
//             var wsHeartbeatId = '';
//
//             ws = Stomp.over(socket);
//
//             if(!Config.useWsLog){
//                 ws.debug = null;
//             }
//
//             ws.connect({}, function(frame) {
//
//                 Config.currentReconnectTimes = 0;
//
//                 var dest = Config.newWsTopic + env.loginId.replace(/\./g,'_');
//
//                 var lastEventSerial = '';
//
//                 ws.subscribe(dest, function(event) {
//                     var eventInfo = {};
//
//                     try{
//                         eventInfo = JSON.parse(event.body);
//                         delete eventInfo.params;
//                         delete eventInfo._type;
//                         delete eventInfo.topics;
//                     }
//                     catch(e){
//                         console.log(e);
//                         return;
//                     }
//
//                     if(lastEventSerial === eventInfo.serial){
//                         util.error('Error: event repeat sent !');
//                         return;
//                     }
//                     else{
//                         lastEventSerial = eventInfo.serial;
//                     }
//
//                     if(Config.useEventLog){
//                         util.debugout.log(' ' + JSON.stringify(eventInfo));
//                     }
//
//                     eventHandler.deliverEvent(eventInfo);
//                 });
//                 callback();
//
//             }, function(frame) {
//                 // websocket upexpected disconnected
//                 // maybe network disconnection, or browser in offline
//                 // this condition will emit wsDisconnected event
//                 if(Config.isManCloseWs){return;}
//                 errorCallback();
//
//                 util.log(frame);
//                 util.error(new Date() + 'websocket disconnect');
//                 // clearInterval(wsHeartbeatId);
//
//                 if(Config.currentReconnectTimes < Config.maxReconnectTimes){
//                     Config.currentReconnectTimes++;
//                     util.reconnectWs();
//                 }
//                 else{
//                     var errorMsg = {
//                         eventName: 'wsDisconnected',
//                         msg: 'websocket disconnect'
//                     };
//                     wellClient.ui.main({
//                         eventName:'wsDisconnected'
//                     });
//                     util.debugout.log('>>> websocket disconnect');
//
//                     wellClient.triggerInnerOn(errorMsg);
//                 }
//             });
//         },
//
//         reconnectWs: function(){
//             setTimeout(function(){
//                 util.log('>>> try to reconnect');
//                 util.debugout.log('>>> try to reconnect');
//                 util.initWebSocket(function(){},function(){});
//
//             }, Config.timeout * 1000);
//         },