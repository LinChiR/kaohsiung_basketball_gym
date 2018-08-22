//取得DATA
var xhr = new XMLHttpRequest;
var map;
xhr.open('get','https://iplay.sa.gov.tw/api/GymSearchAllList?$format=application/json;odata.metadata=none&City=%E9%AB%98%E9%9B%84%E5%B8%82&GymType=%E7%B1%83%E7%90%83%E5%A0%B4',true);
xhr.send(null);

function initMap() {
  //設定中心點座標
 map = new google.maps.Map(document.getElementById('map'), {
  zoom: 11,
  center: {lat: 22.6048695, lng: 120.299119}
  });
}
var zone = document.querySelector('.zone');
xhr.onload = function(){
  zone.addEventListener('change',updatelist);
  var data = JSON.parse(xhr.responseText);
  function updatelist(e){
    for(i=0;i<data.length;i++){
      var positionStr = data[i].LatLng;
      var address = data[i].Address;
      //利用slice取出行政區
      var location = address.slice(3,6);
      var nowPlace = e.target.value;
      if(location == nowPlace){
      var str = {};
      var place = {};
      //利用split 將 string 轉 onject
      var position = positionStr.split(',');
      place.lat = parseFloat(position[0]);
      place.lng = parseFloat(position[1]);
      str.map = map;
      str.title = data[i].Name;
      str.position = place;
      console.log(str);
      var marker = new google.maps.Marker(str);
      }
    }
  }
}