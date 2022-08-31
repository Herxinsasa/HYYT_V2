<!-- 地图界面 -->
<template>
  <div id="cesiumContainer">
    <div id="viewer">
      <cesiumMeasure id="demo1" ref="measure"></cesiumMeasure>
      <div id="but_div">
        <button @click="myFunction()" class="dropbtn">选择显示类型 ∨</button>
        <div id="myDropdown" class="dropdown-content">
          <!-- <a id="a1">全部显示</a> -->
          <a id="a2">大型建筑工地</a>
          <a id="a3">沙石囤积点</a>
          <a id="a4">疑似货运源头</a>
          <a id="a5">疑似开采点</a>
          <!-- <a id="a6">全部隐藏</a> -->
        </div>
        <button @click="myFunction1()" class="dropbtn1">定位 ∨</button>
        <div id="myDropdown1" class="dropdown-content">
          <a id="b1">起始位置</a>
          <a id="b2">BH57</a>
          <a id="b3">BH39</a>
          <a id="b4">BH29</a>
        </div>
        <button @click="show6()" class="dropbtn4">量测</button>
        <div class="Select">
          <span class="text">范围 </span>
          <input class="Box" id="V" type="checkbox" @change="show()" />
        </div>
        <div class="Select1">
          <span class="text">地形 </span>
          <input class="Box" id="T" type="checkbox" @change="show1()" />
        </div>
        <div class="Select2">
          <span class="text">模型 </span>
          <input class="Box" id="M" type="checkbox" @change="show2()" />
        </div>
        <div class="Select3">
          <span class="text">影像 </span>
          <input class="Box" id="P" type="checkbox" @change="show3()" />
        </div>
        <div class="Select4">
          <span class="text">路网 </span>
          <input class="Box" id="R" type="checkbox" @change="show4()" />
        </div>
        <div class="Select5">
          <span class="text">轨迹 </span>
          <input class="Box" id="B" type="checkbox" @change="show7()" />
        </div>
      </div>
      <dv-border-box-8 :reverse="true" class="sidebar" v-if="showSliders">
        <div class="gcontent">
          <div class="row" :style="{ height: heights }">
            <div id="viewer2019">
              <span class="etitle">2019年窗口</span>
            </div>
            <dv-decoration-10
              style="width:95.5%;height:5px;position: absolute;left: 2.5%;bottom: 0;"
            />
          </div>
          <div class="row" :style="{ height: heights }">
            <div id="viewer2020">
              <span class="etitle">2020年窗口</span>
              <div class="dropdown2">
                <button @click="myFunction2()" class="dropbtn2">
                  选择加载影像 ∨
                </button>
                <div id="myDropdown2" class="dropdown-content2">
                  <a id="c4">第一期影像</a>
                  <a id="c1">第二期BH58</a>
                  <a id="c2">第二期BH40</a>
                  <a id="c3">第二期BH30</a>
                </div>
              </div>
            </div>
            <dv-decoration-10
              style="width:95.5%;height:5px;position: absolute;left: 2.5%;bottom: 3px;"
            />
          </div>
        </div>
      </dv-border-box-8>
    </div>
  </div>
</template>
<script src="../../../static/Cesium/Cesium.js"></script>
<script>
import $ from "jquery";
// import { addToolbarMenu } from "../../assets/js/Sandcastle-header.js";
// import measureViewer from "../core/measurePanel";

export default {
  name: "HelloWorld",
  //父组件的数据需要通过 prop 才能下发到子组件中,props是子组件访问父组件数据的唯一接口
  props: {
    msg: String
  },
  //声明变量
  data() {
    return {
      lengths: 2,
      heights: "47%",
      showSliders: true,
      Shp1: ""
    };
  },
  //同时加载，缓存显示
  mounted() {
    $("#demo1").hide();
    //加载Cesium地球影像
    // var viewer = new Cesium.Viewer("viewer", {
    //   animation: false, //是否创建动画小器件，左下角仪表
    //   timeline: false, //是否显示时间轴
    //   baseLayerPicker: false, //是否显示图层选择器
    //   fullscreenButton: false, //是否显示全屏按钮
    //   geocoder: false, //是否显示geocoder小器件，右上角查询按钮
    //   homeButton: false, //是否显示Home按钮
    //   infoBox: false, //是否显示信息框
    //   sceneModePicker: false, //是否显示3D/2D选择器
    //   selectionIndicator: false, //是否显示选取指示器组件
    //   navigationHelpButton: false, //是否显示右上角的帮助按钮
    //   scene3DOnly: true, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    //   imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
    //     url:
    //       "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
    //   }) //arcgis基本基本地图加载
    // });
    // viewer._cesiumWidget._creditContainer.style.display = "none";
    // var viewer2019 = new Cesium.Viewer("viewer2019", {
    //   animation: false, //是否创建动画小器件，左下角仪表
    //   timeline: false, //是否显示时间轴
    //   baseLayerPicker: false, //是否显示图层选择器
    //   fullscreenButton: false, //是否显示全屏按钮
    //   geocoder: false, //是否显示geocoder小器件，右上角查询按钮
    //   homeButton: false, //是否显示Home按钮
    //   infoBox: false, //是否显示信息框
    //   sceneModePicker: false, //是否显示3D/2D选择器
    //   selectionIndicator: false, //是否显示选取指示器组件
    //   navigationHelpButton: false, //是否显示右上角的帮助按钮
    //   scene3DOnly: true, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    //   imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
    //     url:
    //       "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
    //   }) //arcgis基本基本地图加载
    // });
    // viewer2019._cesiumWidget._creditContainer.style.display = "none";
    // var viewer2020 = new Cesium.Viewer("viewer2020", {
    //   animation: false, //是否创建动画小器件，左下角仪表
    //   timeline: false, //是否显示时间轴
    //   baseLayerPicker: false, //是否显示图层选择器
    //   fullscreenButton: false, //是否显示全屏按钮
    //   geocoder: false, //是否显示geocoder小器件，右上角查询按钮
    //   homeButton: false, //是否显示Home按钮
    //   infoBox: false, //是否显示信息框
    //   sceneModePicker: false, //是否显示3D/2D选择器
    //   selectionIndicator: false, //是否显示选取指示器组件
    //   navigationHelpButton: false, //是否显示右上角的帮助按钮
    //   scene3DOnly: true, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    //   imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
    //     url:
    //       "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
    //   }) //arcgis基本基本地图加载
    // }); //应用世界地形3D
    // viewer2020._cesiumWidget._creditContainer.style.display = "none";
    //挂载viewer减少卡顿
    window.viewer = viewer;

    //去除版权信息
    //viewer._cesiumWidget._creditContainer.style.display = "none";

    //取消双击事件
    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    );
    viewer.scene.globe.depthTestAgainstTerrain = true; //开启深度检测，不然画的线面会飘在模型表面

    //设置homebutton的位置
    // viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function(e) {
    // 	e.cancel = true;
    // 	//飞的位置
    // 	viewer.camera.flyTo({
    // 		destination: Cesium.Cartesian3.fromDegrees(117.4, 40.05, 300000)
    // 	});
    // });

    //设置相机初始位置
    viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(117.4, 40.05, 300000)
    });
    viewer2019.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(117.4, 40.05, 300000)
    });
    viewer2020.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(117.4, 40.05, 300000)
    });

    //相机联动
    viewer.camera.changed.addEventListener(function() {
      viewer2019.camera.setView({
        destination: viewer.camera.computeViewRectangle()
      });
      viewer2020.camera.setView({
        destination: viewer.camera.computeViewRectangle()
      });
    });
    viewer.camera.percentageChanged = 0.01; //灵敏度

    viewer2020.camera.changed.addEventListener(function() {
      viewer2019.camera.setView({
        destination: viewer2020.camera.computeViewRectangle()
      });
    });

    viewer2020.camera.percentageChanged = 0.01; //灵敏度

    //控制是否加载影像
    var that = this;
    var imageryLayers;
    var jixian_1;
    var jixian_2;
    that.Pload = function() {
      viewer2020.imageryLayers.remove(jixian_2);

      imageryLayers = viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url:
            "http://localhost:9000/image/917ec0404fda11eb90db7ffe09cd57bb/{z}/{x}/{y}"
        })
      );

      jixian_1 = viewer2019.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url:
            "http://localhost:9000/image/3067d910505011ebaa10034c61470846/{z}/{x}/{y}"
        })
      );

      jixian_2 = viewer2020.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url:
            "http://localhost:9000/image/917ec0404fda11eb90db7ffe09cd57bb/{z}/{x}/{y}"
        })
      );
    };

    that.CPload = function() {
      viewer.imageryLayers.remove(imageryLayers);
      viewer2019.imageryLayers.remove(jixian_1);
      viewer2020.imageryLayers.remove(jixian_2);
    };

    that.MS = function() {
      $("#demo1").show();
      this.$refs.measure.init(viewer);
    };

    that.CMS = function() {
      $("#demo1").hide();
    };
    var roadshp;
    that.Rload = function() {
      //加载地图注记
      roadshp = viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url:
            "http://t6.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=6fac5d1bf8ff875eb0b340c8ea860a95"
        })
      );
    };

    that.CRload = function() {
      viewer.imageryLayers.remove(roadshp);
    };

    //加载百吨王轨迹
    var GJdata1;
    var GJdata2;
    var fentitie1;
    var fentitie2;

    that.Gload = function() {
      GJdata1 = require("../../assets/json/GJ_1.json");
      GJdata1.features.forEach(function(v) {
        var pbag = new Cesium.PropertyBag();
        for (var aa in v.attributes) {
          pbag.addProperty(aa, v.attributes[aa]);
        }
        fentitie1 = new Cesium.Entity({
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.coordinates.toString() + "]")
            ),
            width: 3,
            material: Cesium.Color.RED,
            clampToGround: true //是否贴着地表
          },
          properties: pbag
        });
        viewer.entities.add(fentitie1);
        viewer2020.entities.add(fentitie1);
        viewer2019.entities.add(fentitie1);
      });
      GJdata2 = require("../../assets/json/GJ_2.json");
      GJdata2.features.forEach(function(v) {
        var pbag = new Cesium.PropertyBag();
        for (var aa in v.attributes) {
          pbag.addProperty(aa, v.attributes[aa]);
        }
        fentitie2 = new Cesium.Entity({
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.coordinates.toString() + "]")
            ),
            width: 3,
            material: Cesium.Color.BLUE,
            clampToGround: true //是否贴着地表
          },
          properties: pbag
        });
        viewer.entities.add(fentitie2);
        viewer2020.entities.add(fentitie2);
        viewer2019.entities.add(fentitie2);
      });
    };
    that.CGload = function() {
      viewer.entities.remove(fentitie1);
      viewer2020.entities.remove(fentitie1);
      viewer2019.entities.remove(fentitie1);
      viewer2020.entities.remove(fentitie2);
      viewer2019.entities.remove(fentitie2);
      viewer.entities.remove(fentitie2);
    };

    //加载三维模型，定位到三维模型
    var tileset1;
    var tileset2;
    var tileset3;

    document.getElementById("b1").addEventListener("click", move1);

    function move1() {
      // viewer.scene.primitives.removeAll();
      viewer.scene.primitives.remove(tileset1);
      viewer.scene.primitives.remove(tileset2);
      viewer.scene.primitives.remove(tileset3);
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(117.4, 40.05, 80000)
      });
    }

    document.getElementById("b2").addEventListener("click", move2);

    function move2() {
      // viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider({});
      // //加载三维地形
      // var terrainLayer = new Cesium.CesiumTerrainProvider({
      // 	url: "http://localhost:9000/terrain/bd3d5940451b11ebb4e531734ff3735a",
      // 	// requestVertexNormals: true,// 请求照
      // 	// requestWaterMask: true// 请求水波纹效果
      // });
      // viewer.terrainProvider = terrainLayer;
      //加载三维模型
      viewer.scene.primitives.remove(tileset1);
      viewer.scene.primitives.remove(tileset2);
      viewer.scene.primitives.remove(tileset3);

      var params = {
        tx: 117.3493948, //模型中心X轴坐标（经度）
        ty: 40.0557552, //模型中心Y轴坐标（纬度）
        tz: 11, //模型中心Z轴坐标（高程，单位：米）
        rz: 0 //Z轴（高程）方向旋转角度
      };

      tileset1 = new Cesium.Cesium3DTileset({
        url:
          "http://localhost:9000/model/c224b8f0438511eb9e6b0370e6cbc81e/tileset.json"
      });
      viewer.scene.primitives.add(tileset1);
      tileset1.readyPromise.then(function(arg) {
        rotation(arg);
      });

      function rotation(tileset1) {
        //旋转
        var mz = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(params.rz));
        var rotationZ = Cesium.Matrix4.fromRotationTranslation(mz);
        //平移
        var position = Cesium.Cartesian3.fromDegrees(
          params.tx,
          params.ty,
          params.tz
        );
        var m = Cesium.Transforms.eastNorthUpToFixedFrame(position);
        //旋转平移矩阵相乘
        Cesium.Matrix4.multiply(m, rotationZ, m);
        tileset1._root.transform = m;
      }
      viewer.flyTo(tileset1);
    }

    document.getElementById("b3").addEventListener("click", move3);

    function move3() {
      viewer.scene.primitives.remove(tileset1);
      viewer.scene.primitives.remove(tileset2);
      viewer.scene.primitives.remove(tileset3);

      var params = {
        tx: 117.3498948, //模型中心X轴坐标（经度）
        ty: 40.0552552, //模型中心Y轴坐标（纬度）
        tz: 0, //模型中心Z轴坐标（高程，单位：米）
        rz: 0 //Z轴（高程）方向旋转角度
      };

      tileset2 = new Cesium.Cesium3DTileset({
        url:
          "http://localhost:9000/model/31bc4ad044f211eb80d88f73baad5da1/tileset.json"
      });
      viewer.scene.primitives.add(tileset2);

      tileset2.readyPromise.then(function(arg) {
        rotation(arg);
      });

      function rotation(tileset2) {
        //旋转
        var mz = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(params.rz));
        var rotationZ = Cesium.Matrix4.fromRotationTranslation(mz);
        //平移
        var position = Cesium.Cartesian3.fromDegrees(
          params.tx,
          params.ty,
          params.tz
        );
        var m = Cesium.Transforms.eastNorthUpToFixedFrame(position);
        //旋转平移矩阵相乘
        Cesium.Matrix4.multiply(m, rotationZ, m);
        tileset2._root.transform = m;
      }

      viewer.flyTo(tileset2);
    }

    document.getElementById("b4").addEventListener("click", move4);

    function move4() {
      viewer.scene.primitives.remove(tileset1);
      viewer.scene.primitives.remove(tileset2);
      viewer.scene.primitives.remove(tileset3);
      var params = {
        tx: 117.34923, //模型中心X轴坐标（经度）
        ty: 40.05599, //模型中心Y轴坐标（纬度）
        tz: 11, //模型中心Z轴坐标（高程，单位：米）
        rz: 0 //Z轴（高程）方向旋转角度
      };
      tileset3 = new Cesium.Cesium3DTileset({
        url:
          "http://localhost:9000/model/099f074044f711eb80d88f73baad5da1/tileset.json"
      });
      viewer.scene.primitives.add(tileset3);

      tileset3.readyPromise.then(function(arg) {
        rotation(arg);
      });

      function rotation(tileset3) {
        //旋转
        var mz = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(params.rz));
        var rotationZ = Cesium.Matrix4.fromRotationTranslation(mz);
        //平移
        var position = Cesium.Cartesian3.fromDegrees(
          params.tx,
          params.ty,
          params.tz
        );
        var m = Cesium.Transforms.eastNorthUpToFixedFrame(position);
        //旋转平移矩阵相乘
        Cesium.Matrix4.multiply(m, rotationZ, m);
        tileset3._root.transform = m;
      }

      viewer.flyTo(tileset3);
    }

    //下拉选择框选择加载矢量
    //加载所有矢量数据
    that.Shp1 = function() {
      var shpData1 = require("../../assets/json/BH2021.json");
      shpData1.features.forEach(function(v) {
        var pbag = new Cesium.PropertyBag();
        for (var aa in v.attributes) {
          pbag.addProperty(aa, v.attributes[aa]);
        }
        var hierarchys = new Cesium.PolygonHierarchy(
          Cesium.Cartesian3.fromDegreesArray(
            JSON.parse("[" + v.geometry.rings[0].toString() + "]")
          )
        );

        if (v.geometry.rings.length > 1) {
          hierarchys = new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings[0].toString() + "]")
            ),
            [
              new Cesium.PolygonHierarchy(
                Cesium.Cartesian3.fromDegreesArray(
                  JSON.parse("[" + v.geometry.rings[1].toString() + "]")
                )
              )
            ]
          );
        }

        var fentitie = new Cesium.Entity({
          polygon: {
            hierarchy: hierarchys,
            // material: Cesium.Color.RED.withAlpha(0.05),
            // height: 1,
            // outline: true,
            // outlineColor: Cesium.Color.RED,
            // outlineWidth: 15,
            material: Cesium.Color.TRANSPARENT,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
          },
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            width: 2,
            material: Cesium.Color.TRANSPARENT
            // followSurface: false, //是否贴着地表
          },
          properties: pbag
        });
        viewer.entities.add(fentitie);

        //获取多边形中心位置
        var polyPositions = fentitie.polygon.hierarchy.getValue(
          Cesium.JulianDate.now()
        ).positions;
        var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center; //中心点
        polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
        fentitie.position = polyCenter;
        var pinBuilder = new Cesium.PinBuilder();

        if (fentitie._properties.Level == "一级") {
          var digPin1 = Cesium.when(
            pinBuilder.fromMakiIconId("golf", Cesium.Color.RED, 48),
            function(canvas) {
              return viewer.entities.add({
                polyline: fentitie._polyline,
                polygon: fentitie._polygon,
                properties: fentitie._properties,
                name: "一级标签",
                position: polyCenter,
                billboard: {
                  image: canvas.toDataURL(),
                  verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                  distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                    0,
                    90000
                  ),
                  disableDepthTestDistance: Number.POSITIVE_INFINITY //广告牌的文字不进行深度检测
                }
              });
            }
          );
        } else if (fentitie._properties.Level == "三级") {
          var digPin3 = Cesium.when(
            pinBuilder.fromMakiIconId("golf", Cesium.Color.LIGHTGREEN, 48),
            function(canvas) {
              return viewer.entities.add({
                polyline: fentitie._polyline,
                polygon: fentitie._polygon,
                properties: fentitie._properties,
                name: "三级标签",
                position: polyCenter,
                billboard: {
                  image: canvas.toDataURL(),
                  verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                  distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                    0,
                    90000
                  ), //可视范围
                  disableDepthTestDistance: Number.POSITIVE_INFINITY //广告牌的文字不进行深度检测
                }
              });
            }
          );
        } else {
          var digPin2 = Cesium.when(
            pinBuilder.fromMakiIconId("golf", Cesium.Color.DODGERBLUE, 48),
            function(canvas) {
              return viewer.entities.add({
                polyline: fentitie._polyline,
                polygon: fentitie._polygon,
                properties: fentitie._properties,
                name: "二级标签",
                position: polyCenter,
                billboard: {
                  image: canvas.toDataURL(),
                  verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                  distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                    0,
                    90000
                  ), //可视范围
                  disableDepthTestDistance: Number.POSITIVE_INFINITY //广告牌的文字不进行深度检测
                }
              });
            }
          );
        }
      });
      var shpData2 = require("../../assets/json/XZ_2019.json");
      shpData2.features.forEach(function(v) {
        clampToGround: true;
        var pbag = new Cesium.PropertyBag();
        for (var aa in v.attributes) {
          pbag.addProperty(aa, v.attributes[aa]);
        }
        var fentitie = new Cesium.Entity({
          polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            material: Cesium.Color.RED.withAlpha(0.01),
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            // classificationType : Cesium.ClassificationType.BOTH,
          },
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            width: 2,
            material: Cesium.Color.YELLOW
            // followSurface: false, //是否贴着地表
          },
          properties: pbag
        });
        viewer2019.entities.add(fentitie);
      });
      var shpData3 = require("../../assets/json/XZ_2020.json");
      shpData3.features.forEach(function(v) {
        var pbag = new Cesium.PropertyBag();
        for (var aa in v.attributes) {
          pbag.addProperty(aa, v.attributes[aa]);
        }
        var fentitie = new Cesium.Entity({
          polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            material: Cesium.Color.RED.withAlpha(0.01),
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
          },
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            width: 2,
            material: Cesium.Color.BLUE
            // followSurface: false, //是否贴着地表
          },
          properties: pbag
        });
        viewer2020.entities.add(fentitie);
      });
      var shpData5 = require("../../assets/json/2019_XZ.json");
      shpData5.features.forEach(function(v) {
        var pbag = new Cesium.PropertyBag();
        for (var aa in v.attributes) {
          pbag.addProperty(aa, v.attributes[aa]);
        }
        var fentitie = new Cesium.Entity({
          polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            material: Cesium.Color.RED.withAlpha(0.01),
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
          },
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            width: 2,
            material: Cesium.Color.YELLOW
            // followSurface: false, //是否贴着地表
          },
          properties: pbag
        });
        viewer.entities.add(fentitie);
      });
      var shpData4 = require("../../assets/json/2020_XZ.json");
      shpData4.features.forEach(function(v) {
        var pbag = new Cesium.PropertyBag();
        for (var aa in v.attributes) {
          pbag.addProperty(aa, v.attributes[aa]);
        }
        var fentitie = new Cesium.Entity({
          polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            material: Cesium.Color.RED.withAlpha(0.01),
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
          },
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            width: 2,
            material: Cesium.Color.BLUE
            // followSurface: false, //是否贴着地表
          },
          properties: pbag
        });
        viewer.entities.add(fentitie);
      });
    };

    document.getElementById("a2").addEventListener("click", Shp2);

    function Shp2() {
      viewer2019.entities.removeAll();
      viewer2020.entities.removeAll();
      viewer.entities.removeAll();
      var shpData2 = require("../../assets/json/2019_大型建筑工地.json");
      shpData2.features.forEach(function(v) {
        clampToGround: true;
        var pbag = new Cesium.PropertyBag();
        for (var aa in v.attributes) {
          pbag.addProperty(aa, v.attributes[aa]);
        }
        var fentitie = new Cesium.Entity({
          polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            material: Cesium.Color.RED.withAlpha(0.01),
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
          },
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            width: 2,
            material: Cesium.Color.YELLOW
            // followSurface: false, //是否贴着地表
          },
          properties: pbag
        });
        viewer2019.entities.add(fentitie);
      });
      var shpData3 = require("../../assets/json/2020_大型建筑工地.json");
      shpData3.features.forEach(function(v) {
        var pbag = new Cesium.PropertyBag();
        for (var aa in v.attributes) {
          pbag.addProperty(aa, v.attributes[aa]);
        }
        var fentitie = new Cesium.Entity({
          polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            material: Cesium.Color.RED.withAlpha(0.01),
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
          },
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            width: 2,
            material: Cesium.Color.BLUE
            // followSurface: false, //是否贴着地表
          },
          properties: pbag
        });
        viewer2020.entities.add(fentitie);
      });

      var shpData1 = require("../../assets/json/JZGD.json");
      shpData1.features.forEach(function(v) {
        var pbag = new Cesium.PropertyBag();
        for (var aa in v.attributes) {
          pbag.addProperty(aa, v.attributes[aa]);
        }
        var fentitie = new Cesium.Entity({
          polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            material: Cesium.Color.RED.withAlpha(0.1),
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
          },
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            width: 2,
            material: Cesium.Color.TRANSPARENT
            // followSurface: false, //是否贴着地表
          },
          properties: pbag
        });
        viewer.entities.add(fentitie);

        //获取多边形中心位置
        var polyPositions = fentitie.polygon.hierarchy.getValue(
          Cesium.JulianDate.now()
        ).positions;
        var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center; //中心点
        polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
        fentitie.position = polyCenter;
        var pinBuilder = new Cesium.PinBuilder();

        if (fentitie._properties.Level == "一级") {
          var digPin1 = Cesium.when(
            pinBuilder.fromMakiIconId("golf", Cesium.Color.RED, 48),
            function(canvas) {
              return viewer.entities.add({
                polyline: fentitie._polyline,
                polygon: fentitie._polygon,
                properties: fentitie._properties,
                name: "一级标签",
                position: polyCenter,
                billboard: {
                  image: canvas.toDataURL(),
                  verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                  distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                    0,
                    90000
                  ),
                  disableDepthTestDistance: Number.POSITIVE_INFINITY //广告牌的文字不进行深度检测
                }
              });
            }
          );
        } else if (fentitie._properties.Level == "三级") {
          var digPin3 = Cesium.when(
            pinBuilder.fromMakiIconId("golf", Cesium.Color.LIGHTGREEN, 48),
            function(canvas) {
              return viewer.entities.add({
                polyline: fentitie._polyline,
                polygon: fentitie._polygon,
                properties: fentitie._properties,
                name: "三级标签",
                position: polyCenter,
                billboard: {
                  image: canvas.toDataURL(),
                  verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                  distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                    0,
                    90000
                  ), //可视范围
                  disableDepthTestDistance: Number.POSITIVE_INFINITY //广告牌的文字不进行深度检测
                }
              });
            }
          );
        } else {
          var digPin2 = Cesium.when(
            pinBuilder.fromMakiIconId("golf", Cesium.Color.DODGERBLUE, 48),
            function(canvas) {
              return viewer.entities.add({
                polyline: fentitie._polyline,
                polygon: fentitie._polygon,
                properties: fentitie._properties,
                name: "二级标签",
                position: polyCenter,
                billboard: {
                  image: canvas.toDataURL(),
                  verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                  distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                    0,
                    90000
                  ), //可视范围
                  disableDepthTestDistance: Number.POSITIVE_INFINITY //广告牌的文字不进行深度检测
                }
              });
            }
          );
        }
      });
    }

    document.getElementById("a3").addEventListener("click", Shp3);

    function Shp3() {
      viewer2019.entities.removeAll();
      viewer2020.entities.removeAll();
      viewer.entities.removeAll();
      var shpData2 = require("../../assets/json/2019_沙石囤积点.json");
      shpData2.features.forEach(function(v) {
        clampToGround: true;
        var pbag = new Cesium.PropertyBag();
        for (var aa in v.attributes) {
          pbag.addProperty(aa, v.attributes[aa]);
        }
        var fentitie = new Cesium.Entity({
          polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            material: Cesium.Color.RED.withAlpha(0.01),
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
          },
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            width: 2,
            material: Cesium.Color.YELLOW
            // followSurface: false, //是否贴着地表
          },
          properties: pbag
        });
        viewer2019.entities.add(fentitie);
      });
      var shpData3 = require("../../assets/json/2020_沙石囤积点.json");
      shpData3.features.forEach(function(v) {
        var pbag = new Cesium.PropertyBag();
        for (var aa in v.attributes) {
          pbag.addProperty(aa, v.attributes[aa]);
        }
        var fentitie = new Cesium.Entity({
          polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            material: Cesium.Color.RED.withAlpha(0.01),
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
          },
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            width: 2,
            material: Cesium.Color.BLUE
            // followSurface: false, //是否贴着地表
          },
          properties: pbag
        });
        viewer2020.entities.add(fentitie);
      });
      var shpData1 = require("../../assets/json/SSTJ.json");
      shpData1.features.forEach(function(v) {
        var pbag = new Cesium.PropertyBag();
        for (var aa in v.attributes) {
          pbag.addProperty(aa, v.attributes[aa]);
        }
        var fentitie = new Cesium.Entity({
          polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            material: Cesium.Color.TRANSPARENT,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
          },
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            width: 2,
            material: Cesium.Color.TRANSPARENT
            // followSurface: false, //是否贴着地表
          },
          properties: pbag
        });
        viewer.entities.add(fentitie);

        //获取多边形中心位置
        var polyPositions = fentitie.polygon.hierarchy.getValue(
          Cesium.JulianDate.now()
        ).positions;
        var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center; //中心点
        polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
        fentitie.position = polyCenter;
        var pinBuilder = new Cesium.PinBuilder();

        if (fentitie._properties.Level == "一级") {
          var digPin1 = Cesium.when(
            pinBuilder.fromMakiIconId("golf", Cesium.Color.RED, 48),
            function(canvas) {
              return viewer.entities.add({
                polyline: fentitie._polyline,
                polygon: fentitie._polygon,
                properties: fentitie._properties,
                name: "一级标签",
                position: polyCenter,
                billboard: {
                  image: canvas.toDataURL(),
                  verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                  distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                    0,
                    90000
                  ),
                  disableDepthTestDistance: Number.POSITIVE_INFINITY //广告牌的文字不进行深度检测
                }
              });
            }
          );
        } else if (fentitie._properties.Level == "三级") {
          var digPin3 = Cesium.when(
            pinBuilder.fromMakiIconId("golf", Cesium.Color.LIGHTGREEN, 48),
            function(canvas) {
              return viewer.entities.add({
                polyline: fentitie._polyline,
                polygon: fentitie._polygon,
                properties: fentitie._properties,
                name: "三级标签",
                position: polyCenter,
                billboard: {
                  image: canvas.toDataURL(),
                  verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                  distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                    0,
                    90000
                  ), //可视范围
                  disableDepthTestDistance: Number.POSITIVE_INFINITY //广告牌的文字不进行深度检测
                }
              });
            }
          );
        } else {
          var digPin2 = Cesium.when(
            pinBuilder.fromMakiIconId("golf", Cesium.Color.DODGERBLUE, 48),
            function(canvas) {
              return viewer.entities.add({
                polyline: fentitie._polyline,
                polygon: fentitie._polygon,
                properties: fentitie._properties,
                name: "二级标签",
                position: polyCenter,
                billboard: {
                  image: canvas.toDataURL(),
                  verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                  distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                    0,
                    90000
                  ), //可视范围
                  disableDepthTestDistance: Number.POSITIVE_INFINITY //广告牌的文字不进行深度检测
                }
              });
            }
          );
        }
      });
    }

    document.getElementById("a4").addEventListener("click", Shp4);

    function Shp4() {
      viewer2019.entities.removeAll();
      viewer2020.entities.removeAll();
      viewer.entities.removeAll();
      var shpData2 = require("../../assets/json/2019_疑似货运源头.json");
      shpData2.features.forEach(function(v) {
        clampToGround: true;
        var pbag = new Cesium.PropertyBag();
        for (var aa in v.attributes) {
          pbag.addProperty(aa, v.attributes[aa]);
        }
        var fentitie = new Cesium.Entity({
          polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            material: Cesium.Color.RED.withAlpha(0.01),
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
          },
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            width: 2,
            material: Cesium.Color.YELLOW
            // followSurface: false, //是否贴着地表
          },
          properties: pbag
        });
        viewer2019.entities.add(fentitie);
      });
      var shpData3 = require("../../assets/json/2020_疑似货运源头.json");
      shpData3.features.forEach(function(v) {
        var pbag = new Cesium.PropertyBag();
        for (var aa in v.attributes) {
          pbag.addProperty(aa, v.attributes[aa]);
        }
        var fentitie = new Cesium.Entity({
          polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            material: Cesium.Color.RED.withAlpha(0.01),
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
          },
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            width: 2,
            material: Cesium.Color.BLUE
            // followSurface: false, //是否贴着地表
          },
          properties: pbag
        });
        viewer2020.entities.add(fentitie);
      });
      var shpData1 = require("../../assets/json/HYYT.json");
      shpData1.features.forEach(function(v) {
        var pbag = new Cesium.PropertyBag();
        for (var aa in v.attributes) {
          pbag.addProperty(aa, v.attributes[aa]);
        }
        var fentitie = new Cesium.Entity({
          polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            material: Cesium.Color.TRANSPARENT,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
          },
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            width: 2,
            material: Cesium.Color.TRANSPARENT
            // followSurface: false, //是否贴着地表
          },
          properties: pbag
        });
        viewer.entities.add(fentitie);

        //获取多边形中心位置
        var polyPositions = fentitie.polygon.hierarchy.getValue(
          Cesium.JulianDate.now()
        ).positions;
        var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center; //中心点
        polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
        fentitie.position = polyCenter;
        var pinBuilder = new Cesium.PinBuilder();

        if (fentitie._properties.Level == "一级") {
          var digPin1 = Cesium.when(
            pinBuilder.fromMakiIconId("golf", Cesium.Color.RED, 48),
            function(canvas) {
              return viewer.entities.add({
                polyline: fentitie._polyline,
                polygon: fentitie._polygon,
                properties: fentitie._properties,
                name: "一级标签",
                position: polyCenter,
                billboard: {
                  image: canvas.toDataURL(),
                  verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                  distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                    0,
                    90000
                  ),
                  disableDepthTestDistance: Number.POSITIVE_INFINITY //广告牌的文字不进行深度检测
                }
              });
            }
          );
        } else if (fentitie._properties.Level == "三级") {
          var digPin3 = Cesium.when(
            pinBuilder.fromMakiIconId("golf", Cesium.Color.LIGHTGREEN, 48),
            function(canvas) {
              return viewer.entities.add({
                polyline: fentitie._polyline,
                polygon: fentitie._polygon,
                properties: fentitie._properties,
                name: "三级标签",
                position: polyCenter,
                billboard: {
                  image: canvas.toDataURL(),
                  verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                  distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                    0,
                    90000
                  ), //可视范围
                  disableDepthTestDistance: Number.POSITIVE_INFINITY //广告牌的文字不进行深度检测
                }
              });
            }
          );
        } else {
          var digPin2 = Cesium.when(
            pinBuilder.fromMakiIconId("golf", Cesium.Color.DODGERBLUE, 48),
            function(canvas) {
              return viewer.entities.add({
                polyline: fentitie._polyline,
                polygon: fentitie._polygon,
                properties: fentitie._properties,
                name: "二级标签",
                position: polyCenter,
                billboard: {
                  image: canvas.toDataURL(),
                  verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                  distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                    0,
                    90000
                  ), //可视范围
                  disableDepthTestDistance: Number.POSITIVE_INFINITY //广告牌的文字不进行深度检测
                }
              });
            }
          );
        }
      });
    }

    document.getElementById("a5").addEventListener("click", Shp5);

    function Shp5() {
      viewer2019.entities.removeAll();
      viewer2020.entities.removeAll();
      viewer.entities.removeAll();
      var shpData2 = require("../../assets/json/2019_疑似开采点.json");
      shpData2.features.forEach(function(v) {
        clampToGround: true;
        var pbag = new Cesium.PropertyBag();
        for (var aa in v.attributes) {
          pbag.addProperty(aa, v.attributes[aa]);
        }
        var fentitie = new Cesium.Entity({
          polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            material: Cesium.Color.RED.withAlpha(0.01),
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
          },
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            width: 2,
            material: Cesium.Color.YELLOW
            // followSurface: false, //是否贴着地表
          },
          properties: pbag
        });
        viewer2019.entities.add(fentitie);
      });
      var shpData3 = require("../../assets/json/2020_疑似开采点.json");
      shpData3.features.forEach(function(v) {
        var pbag = new Cesium.PropertyBag();
        for (var aa in v.attributes) {
          pbag.addProperty(aa, v.attributes[aa]);
        }
        var fentitie = new Cesium.Entity({
          polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            material: Cesium.Color.RED.withAlpha(0.01),
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
          },
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            width: 2,
            material: Cesium.Color.BLUE
            // followSurface: false, //是否贴着地表
          },
          properties: pbag
        });
        viewer2020.entities.add(fentitie);
      });
      var shpData1 = require("../../assets/json/YSKC.json");
      shpData1.features.forEach(function(v) {
        var pbag = new Cesium.PropertyBag();
        for (var aa in v.attributes) {
          pbag.addProperty(aa, v.attributes[aa]);
        }
        var fentitie = new Cesium.Entity({
          polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            material: Cesium.Color.TRANSPARENT,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
          },
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(
              JSON.parse("[" + v.geometry.rings.toString() + "]")
            ),
            width: 2,
            material: Cesium.Color.TRANSPARENT
            // followSurface: false, //是否贴着地表
          },
          properties: pbag
        });
        viewer.entities.add(fentitie);

        //获取多边形中心位置
        var polyPositions = fentitie.polygon.hierarchy.getValue(
          Cesium.JulianDate.now()
        ).positions;
        var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center; //中心点
        polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
        fentitie.position = polyCenter;
        var pinBuilder = new Cesium.PinBuilder();

        if (fentitie._properties.Level == "一级") {
          var digPin1 = Cesium.when(
            pinBuilder.fromMakiIconId("golf", Cesium.Color.RED, 48),
            function(canvas) {
              return viewer.entities.add({
                polyline: fentitie._polyline,
                polygon: fentitie._polygon,
                properties: fentitie._properties,
                name: "一级标签",
                position: polyCenter,
                billboard: {
                  image: canvas.toDataURL(),
                  verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                  distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                    0,
                    90000
                  ),
                  disableDepthTestDistance: Number.POSITIVE_INFINITY //广告牌的文字不进行深度检测
                }
              });
            }
          );
        } else if (fentitie._properties.Level == "三级") {
          var digPin3 = Cesium.when(
            pinBuilder.fromMakiIconId("golf", Cesium.Color.LIGHTGREEN, 48),
            function(canvas) {
              return viewer.entities.add({
                polyline: fentitie._polyline,
                polygon: fentitie._polygon,
                properties: fentitie._properties,
                name: "三级标签",
                position: polyCenter,
                billboard: {
                  image: canvas.toDataURL(),
                  verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                  distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                    0,
                    90000
                  ), //可视范围
                  disableDepthTestDistance: Number.POSITIVE_INFINITY //广告牌的文字不进行深度检测
                }
              });
            }
          );
        } else {
          var digPin2 = Cesium.when(
            pinBuilder.fromMakiIconId("golf", Cesium.Color.DODGERBLUE, 48),
            function(canvas) {
              return viewer.entities.add({
                polyline: fentitie._polyline,
                polygon: fentitie._polygon,
                properties: fentitie._properties,
                name: "二级标签",
                position: polyCenter,
                billboard: {
                  image: canvas.toDataURL(),
                  verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                  distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                    0,
                    90000
                  ), //可视范围
                  disableDepthTestDistance: Number.POSITIVE_INFINITY //广告牌的文字不进行深度检测
                }
              });
            }
          );
        }
      });
    }
    // document.getElementById("a6").addEventListener("click", Shp6);

    that.Shp6 = function() {
      viewer2019.entities.removeAll();
      viewer2020.entities.removeAll();
      viewer.entities.removeAll();
    };

    //弹窗div
    var infoDiv =
      '<div id="trackPopUp" style="display:none;" >' +
      '<div id="trackPopUpContent" class="leaflet-popup" style="top:5px;left:0;">' +
      '<a class="leaflet-popup-close-button" href="#">×</a>' +
      '<div class="leaflet-popup-content-wrapper">' +
      '<div id="trackPopUpLink" class="leaflet-popup-content" style="max-width: 300px;"></div>' +
      "</div>" +
      "</div>" +
      "</div>";
    $("#cesiumContainer").append(infoDiv);

    var infoDiv1 =
      '<div id="trackPopUp1" style="display:none;" >' +
      '<div id="trackPopUpContent1" class="leaflet-popup1" style="top:5px;left:0;">' +
      '<a class="leaflet-popup-close-button1" href="#">×</a>' +
      '<div class="leaflet-popup-content-wrapper1">' +
      '<div id="trackPopUpLink1" class="leaflet-popup-content1" style="max-width: 300px;"></div>' +
      "</div>" +
      "</div>" +
      "</div>";
    $("#cesiumContainer").append(infoDiv1);

    var infoDiv2 =
      '<div id="trackPopUp2" style="display:none;" >' +
      '<div id="trackPopUpContent2" class="leaflet-popup2" style="top:5px;left:0;">' +
      '<a class="leaflet-popup-close-button2" href="#">×</a>' +
      '<div class="leaflet-popup-content-wrapper2">' +
      '<div id="trackPopUpLink2" class="leaflet-popup-content2" style="max-width: 300px;"></div>' +
      "</div>" +
      "</div>" +
      "</div>";
    $("#cesiumContainer").append(infoDiv2);

    var previousPick = {
      feature: undefined,
      originalColor: new Cesium.Color(),
      outline: false,
      polygon: false
    };

    //弹窗内容点击事件
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function(event) {
      //是否已经存在点亮
      if (previousPick.feature) {
        previousPick.feature.show = previousPick.polygon;
        previousPick.feature = undefined;
      }
      // if (previousPick.feature) {
      // 	previousPick.feature.show = previousPick.polygon;
      // 	previousPick.feature = undefined;
      // }
      var pick = viewer.scene.pick(event.position); //pick选中的对象
      //判断是否点击到模型
      if (pick && pick.name != "undefined") {
        // if (pick.id.polygon.outline == undefined) {
        // 	pick.id.polygon.outline = true;
        // 	pick.id.polygon.outlineColor = Cesium.Color.RED;
        // 	pick.id.polygon.outlineWidth = 15;
        // } else {
        // 	pick.id.polygon.outline = undefined;
        // }
        previousPick.feature = pick.id.polygon;
        pick.id.polygon.show = true;
        pick.id.polygon.clampToGround = true;
        pick.id.polygon.material = new Cesium.GridMaterialProperty({
          color: Cesium.Color.RED.withAlpha(1),
          cellAlpha: 0.2, //透明度，和上面的withAlpha效果相同
          lineCount: new Cesium.Cartesian2(10, 8),
          lineThickness: new Cesium.Cartesian2(1.5, 0),
          lineOffset: new Cesium.Cartesian2(10, 100)
        });
        // previousPick.feature = pick.id.polyline;
        // pick.id.polyline.show = true;
        // pick.id.polyline.clampToGround = true;
        // pick.id.polyline.material = Cesium.Color.RED;
        // pick.id.polyline.Width = 2;

        var ellipsoid = viewer.scene.globe.ellipsoid;
        var location = viewer.camera.pickEllipsoid(event.position, ellipsoid); //将笛卡尔坐标转换为地理坐标
        console.log("笛卡尔坐标:" + location);
        console.log(pick.id);
        $("#trackPopUp").show(); //显示弹窗
        var cartographic = Cesium.Cartographic.fromCartesian(location); //将弧度转为度的十进制度表示
        var longitude = Cesium.Math.toDegrees(cartographic.longitude); //经度
        var latitude = Cesium.Math.toDegrees(cartographic.latitude); //纬度
        var height = cartographic.height; //高度
        var point = [longitude, latitude];
        var destination = Cesium.Cartesian3.fromDegrees(
          point[0],
          point[1],
          3000.0
        );
        console.log("经纬度:" + longitude, latitude, height);
        // var id = pick.id._id.replace(/[^0-9]/ig, "");
        var content =
          '<tr><th style="color:white;">TB_ID:</th><td><input class="dtInput" " value=' +
          pick.id._properties.TB_ID +
          "></td></tr>" +
          '<tr><th style="color:white;">行政区名:</th><td><input class="dtInput" " value=' +
          pick.id._properties.ZN +
          "></td></tr>" +
          '<tr><th style="color:white;">村名称:</th><td><input class="dtInput" " value=' +
          pick.id._properties.CM +
          "></td></tr>" +
          '<tr><th style="color:white;">类型:</th><td><input class="dtInput" " value=' +
          pick.id._properties.LX +
          "></td></tr>" +
          '<tr><th style="color:white;">等级:</th><td><input class="dtInput" " value=' +
          pick.id._properties.Level +
          "></td></tr>" +
          '<tr><th style="color:white;">变化类型:</th><td><input class="dtInput" " value=' +
          pick.id._properties.BHMC +
          "></td></tr>" +
          '<tr><th style="color:white;">变化面积:</th><td><input class="dtInput" " value=' +
          pick.id._properties.Area +
          "></td></tr>" +
          '<tr><th style="color:white;">详细位置:</th><td><input class="dtInput" " value=' +
          pick.id._properties.XXDZ +
          "></td></tr>";
        var obj = {
          position: event.position,
          destination: destination,
          content: content
        };
        infoWindow(obj);

        function infoWindow(obj) {
          var picked = viewer.scene.pick(obj.position);
          if (Cesium.defined(picked)) {
            var id = picked.id;
            if (id instanceof Cesium.Entity) {
              $(".cesium-selection-wrapper").show();
              $("#trackPopUpLink").empty();
              $("#trackPopUpLink").append(obj.content);

              // 弹窗关闭
              $(".leaflet-popup-close-button").click(function() {
                $("#trackPopUp").hide();
                $("#trackPopUpLink").empty();
                $(".cesium-selection-wrapper").hide();
                if (!handler) {
                  // 如果无handler3D操作，移除当前的trackPopUp
                  $("#trackPopUp").remove();
                }
              });
              return id;
            }
          }
        }
      } else {
        $("#trackPopUp").hide();
        pick.id.polygon.show = false;
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    var handler1 = new Cesium.ScreenSpaceEventHandler(viewer2019.scene.canvas);
    handler1.setInputAction(function(movement) {
      var pick = viewer2019.scene.pick(movement.position); //pick选中的对象
      //判断是否点击到模型
      if (pick && pick.id) {
        var position = viewer2019.scene.pickPosition(movement.position);
        console.log("笛卡尔坐标:" + position);
        console.log(pick.id);
        $("#trackPopUp1").show(); //显示弹窗
        var cartographic = Cesium.Cartographic.fromCartesian(position); //将弧度坐标转换为经纬度坐标
        var longitude = Cesium.Math.toDegrees(cartographic.longitude); //经度
        var latitude = Cesium.Math.toDegrees(cartographic.latitude); //纬度
        var height = cartographic.height; //高度
        var point = [longitude, latitude];
        var destination = Cesium.Cartesian3.fromDegrees(
          point[0],
          point[1],
          3000.0
        );
        console.log("经纬度:" + longitude, latitude, height);
        var id = pick.id._id.replace(/[^0-9]/gi, "");
        var content =
          '<tr><th style="color:white;">序号:</th><td><input class="dtInput" " value=' +
          pick.id._properties.OBJECTID +
          "></td></tr>" +
          '<tr><th style="color:white;">名称:</th><td><input class="dtInput" " value=' +
          pick.id._properties.TB_ID +
          "></td></tr>" +
          '<tr><th style="color:white;">类型:</th><td><input class="dtInput" " value=' +
          pick.id._properties.XZINFO +
          "></td></tr>" +
          '<tr><th style="color:white;">面积:</th><td><input class="dtInput" " value=' +
          pick.id._properties.MJ +
          "></td></tr>";
        var obj = {
          position: movement.position,
          destination: destination,
          content: content
        };
        infoWindow(obj);

        function infoWindow(obj) {
          var picked = viewer2019.scene.pick(obj.position);
          if (Cesium.defined(picked)) {
            var id = picked.id;
            if (id instanceof Cesium.Entity) {
              $(".cesium-selection-wrapper1").show();
              $("#trackPopUpLink1").empty();
              $("#trackPopUpLink1").append(obj.content);

              // PopUp close button event handler
              $(".leaflet-popup-close-button1").click(function() {
                $("#trackPopUp1").hide();
                $("#trackPopUpLink1").empty();
                $(".cesium-selection-wrapper1").hide();
                if (!handler1) {
                  // 如果无handler3D操作，移除当前的trackPopUp
                  $("#trackPopUp1").remove();
                }
              });
              return id;
            }
          }
        }
      } else {
        $("#trackPopUp1").hide();
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    var handler2 = new Cesium.ScreenSpaceEventHandler(viewer2020.scene.canvas);
    handler2.setInputAction(function(movement) {
      var pick = viewer2020.scene.pick(movement.position); //pick选中的对象
      //判断是否点击到模型
      if (pick && pick.id) {
        var position = viewer2020.scene.pickPosition(movement.position);
        console.log("笛卡尔坐标:" + position);
        console.log(pick.id);
        $("#trackPopUp2").show(); //显示弹窗
        var cartographic = Cesium.Cartographic.fromCartesian(position); //将弧度坐标转换为经纬度坐标
        var longitude = Cesium.Math.toDegrees(cartographic.longitude); //经度
        var latitude = Cesium.Math.toDegrees(cartographic.latitude); //纬度
        var height = cartographic.height; //高度
        var point = [longitude, latitude];
        var destination = Cesium.Cartesian3.fromDegrees(
          point[0],
          point[1],
          3000.0
        );
        console.log("经纬度:" + longitude, latitude, height);
        var id = pick.id._id.replace(/[^0-9]/gi, "");
        var content =
          '<tr><th style="color:white;">序号:</th><td><input class="dtInput" " value=' +
          pick.id._properties.OBJECTID +
          "></td></tr>" +
          '<tr><th style="color:white;">名称:</th><td><input class="dtInput" " value=' +
          pick.id._properties.TB_ID +
          "></td></tr>" +
          '<tr><th style="color:white;">类型:</th><td><input class="dtInput" " value=' +
          pick.id._properties.XZINFO +
          "></td></tr>" +
          '<tr><th style="color:white;">面积:</th><td><input class="dtInput" " value=' +
          pick.id._properties.MJ +
          "></td></tr>";
        var obj = {
          position: movement.position,
          destination: destination,
          content: content
        };
        infoWindow(obj);

        function infoWindow(obj) {
          var picked = viewer2020.scene.pick(obj.position);
          if (Cesium.defined(picked)) {
            var id = picked.id;
            if (id instanceof Cesium.Entity) {
              $(".cesium-selection-wrapper2").show();
              $("#trackPopUpLink2").empty();
              $("#trackPopUpLink2").append(obj.content);

              // PopUp close button event handler
              $(".leaflet-popup-close-button2").click(function() {
                $("#trackPopUp2").hide();
                $("#trackPopUpLink2").empty();
                $(".cesium-selection-wrapper2").hide();
                if (!handler2) {
                  // 如果无handler3D操作，移除当前的trackPopUp
                  $("#trackPopUp2").remove();
                }
              });
              return id;
            }
          }
        }
      } else {
        $("#trackPopUp2").hide();
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    //调用边侧框函数
    this.changeHeight(this.lengths);

    //地形加载/取消
    that.Tload = function() {
      // viewer.terrainProvider = new Cesium.createWorldTerrain(); //应用世界地形3D
      viewer.terrainProvider = new Cesium.ArcGISTiledElevationTerrainProvider({
        url:
          "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer"
      });
    };

    that.CTload = function() {
      viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider({}); //取消地形
    };

    that.Mload = function() {
      viewer.scene.primitives.remove(tileset1);
      viewer.scene.primitives.remove(tileset2);
      viewer.scene.primitives.remove(tileset3);

      tileset1 = new Cesium.Cesium3DTileset({
        url:
          "http://localhost:9000/model/c224b8f0438511eb9e6b0370e6cbc81e/tileset.json"
      });
      viewer.scene.primitives.add(tileset1);
      tileset2 = new Cesium.Cesium3DTileset({
        url:
          "http://localhost:9000/model/31bc4ad044f211eb80d88f73baad5da1/tileset.json"
      });
      viewer.scene.primitives.add(tileset2);
      tileset3 = new Cesium.Cesium3DTileset({
        url:
          "http://localhost:9000/model/099f074044f711eb80d88f73baad5da1/tileset.json"
      });
      viewer.scene.primitives.add(tileset3);
    };

    that.CMload = function() {
      viewer.scene.primitives.remove(tileset1);
      viewer.scene.primitives.remove(tileset2);
      viewer.scene.primitives.remove(tileset3);
    };
    //2020第二期影像加载
    document.getElementById("c1").addEventListener("click", Lay1);

    function Lay1() {
      var rect;
      rect = Cesium.Rectangle.fromRadians(
        2.0480241270292012,
        0.699029393613112,
        2.04824211803074,
        0.6991808672477889
      );
      var layer1 = viewer2020.scene.imageryLayers.addImageryProvider(
        //lab切的影像图
        new Cesium.UrlTemplateImageryProvider({
          url:
            "http://localhost:9000/image/cde148b0853011eba77383e1cf8ceae8/{z}/{x}/{y}",
          rectangle: rect
        })
      );
      viewer.flyTo(layer1);
    }

    document.getElementById("c2").addEventListener("click", Lay2);

    function Lay2() {
      var rect;
      rect = Cesium.Rectangle.fromRadians(
        2.0512201204290674,
        0.7002834014224655,
        2.051406247223652,
        0.7003961473555061
      );
      var layer1 = viewer2020.scene.imageryLayers.addImageryProvider(
        //lab切的影像图
        new Cesium.UrlTemplateImageryProvider({
          url:
            "http://localhost:9000/image/2ebd3b60459111eba74553c81e09e69c/{z}/{x}/{y}",
          rectangle: rect
        })
      );
      viewer.flyTo(layer1);
    }

    document.getElementById("c3").addEventListener("click", Lay3);

    function Lay3() {
      var rect;
      rect = Cesium.Rectangle.fromRadians(
        2.0468520792676084,
        0.6988779328163858,
        2.047012593264052,
        0.6989921335770597
      );
      var layer1 = viewer2020.scene.imageryLayers.addImageryProvider(
        //lab切的影像图
        new Cesium.UrlTemplateImageryProvider({
          url:
            "http://localhost:9000/image/09a784c0459111eba74553c81e09e69c/{z}/{x}/{y}",
          rectangle: rect
        })
      );
      viewer.flyTo(layer1);
    }

    document.getElementById("c4").addEventListener("click", Lay4);
    //改善：改用移除再加
    function Lay4() {
      jixian_2 = viewer2020.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url:
            "http://localhost:9000/image/917ec0404fda11eb90db7ffe09cd57bb/{z}/{x}/{y}"
        })
      );
    }

    // 点击下拉菜单意外区域隐藏
    window.onclick = function(event) {
      if (!event.target.matches(".dropbtn")) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("show")) {
            openDropdown.classList.remove("show");
          }
        }
      }
      if (!event.target.matches(".dropbtn1")) {
        var dropdowns = document.getElementsByClassName("dropdown-content1");
        for (var i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("show")) {
            openDropdown.classList.remove("show");
          }
        }
      }
      if (!event.target.matches(".dropbtn2")) {
        var dropdowns = document.getElementsByClassName("dropdown-content2");
        for (var i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("show")) {
            openDropdown.classList.remove("show");
          }
        }
      }
    };
  }, //mounted中括号

  //事件函数调用
  methods: {
    //右侧视图占比
    changeHeight(ind) {
      if (ind == 0) {
        this.heights = "0";
      } else if (ind == 1) {
        this.heights = "100%";
      } else if (ind == 2) {
        this.heights = "50%";
      } else if (ind == 3) {
        this.heights = "33.33%";
      } else {
        this.heights = "25%";
      }
    },
    // 点击按钮下拉菜单在 显示/隐藏 之间切换
    myFunction: function() {
      document.getElementById("myDropdown").classList.toggle("show");
    },
    myFunction1: function() {
      document.getElementById("myDropdown1").classList.toggle("show");
    },
    myFunction2: function() {
      document.getElementById("myDropdown2").classList.toggle("show");
    },

    //矢量加载
    show: function() {
      var a = document.getElementById("V").checked;
      if (a) {
        this.Shp1();
      } else {
        this.Shp6();
      }
    },

    //地形加载
    show1: function() {
      var a = document.getElementById("T").checked;
      if (a) {
        this.Tload();
      } else {
        this.CTload();
      }
    },

    //模型加载
    show2: function() {
      var a = document.getElementById("M").checked;
      if (a) {
        this.Mload();
      } else {
        this.CMload();
      }
    },

    //影像加载
    show3: function() {
      var a = document.getElementById("P").checked; //根据id获取状态
      if (a) {
        this.Pload();
      } else {
        this.CPload();
      }
    },

    //路网加载
    show4: function() {
      var a = document.getElementById("R").checked; //根据id获取状态
      if (a) {
        this.Rload();
      } else {
        this.CRload();
      }
    },

    show5: function() {
      var a = document.getElementById("MS").checked; //根据id获取状态
      if (a) {
        this.MS();
      } else {
        this.CMS();
      }
    },
    show6: function() {
      this.MS();
    },

    //百吨王路线加载
    show7: function() {
      var a = document.getElementById("B").checked; //根据id获取状态
      if (a) {
        this.Gload();
      } else {
        this.CGload();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin button-style {
  z-index: 4;
  text-align: center;
  font-size: 0.2rem;
  width: 12vh;
  position: absolute;
  display: inline-block;
  border: 1px solid #444;
  color: #edffff;
  fill: #edffff;
  border-radius: 1vh;
  background-color: rgb(40, 56, 79);
  padding: 1vh 0px;
}
@mixin drop-style {
  z-index: 4;
  width: 15vh;
  position: absolute;
  display: inline-block;
  border: 0.1vh solid #444;
  color: #edffff;
  fill: #edffff;
  border-radius: 1vh;
  cursor: pointer;
  font-size: 0.2rem;
  background-color: rgb(40, 56, 79);
  padding: 1vh 0px;
}
#measurePanel[data-v-4d15eb8e] {
  position: absolute;
  background: rgb(40, 56, 79) !important;
  border-radius: 4px;
  z-index: 2;
  right: 10px;
  top: 10px;
  color: #edffff;
  margin-top: 90px !important;
  margin-right: 532px !important;
}

.graphic-draw-main[data-v-4d15eb8e] {
  height: 52px;
  padding: 0 5px;
  background-color: rgb(40, 56, 79) !important;
  vertical-align: middle;
  color: #2988cc;
  border-bottom: 1px solid #1f3c5c;
}

.graphic-draw-main ul li span[data-v-4d15eb8e] {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: block;
  text-align: center;
  vertical-align: middle;
  font-size: 12px;
  color: #edffff;
  line-height: 22px;
}

.el-header[data-v-4d15eb8e] {
  height: 32px !important;
  line-height: 32px !important;
  border-bottom: 1px solid #1f3c5c;
  padding: 0 5px;
  position: absolute !important;
  margin-left: 900px !important;
}

/* 气泡窗口0*/
.leaflet-popup {
  margin-left: 20px;
  margin-top: 90px;
  position: absolute;
  text-align: center;
  z-index: 4;
}

.leaflet-popup-close-button {
  margin-right: 5px;
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px 4px 0 0;
  text-align: center;
  width: 18px;
  height: 14px;
  font: 16px/14px Tahoma, Verdana, sans-serif;
  color: #c3c3c3;
  text-decoration: none;
  font-weight: bold;
  background: transparent;
}

.leaflet-popup-content-wrapper {
  max-height: 500px;
  width: 340px;
  overflow-y: auto;
  height: 230px;
  padding: 1px;
  text-align: right;
  border-radius: 0px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  background: "";
  background-image: url(../../assets/image/login-border.png);
}

.leaflet-popup-content {
  margin: 15px 19px;
  line-height: 1.4;
}

/* 弹窗1 */
.leaflet-popup1 {
  /* float: left; */
  z-index: 4;
  margin-left: 66vw;
  margin-top: 12vh;
  position: absolute;
  text-align: center;
}

.leaflet-popup-close-button1 {
  margin-right: 5px;
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px 4px 0 0;
  text-align: center;
  width: 18px;
  height: 14px;
  font: 16px/14px Tahoma, Verdana, sans-serif;
  color: #c3c3c3;
  text-decoration: none;
  font-weight: bold;
  background: transparent;
}

.leaflet-popup-content-wrapper1 {
  max-height: 250px;
  overflow-y: auto;
  height: 150px;
  padding: 1px;
  text-align: right;
  border-radius: 0px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  background-image: url(../../assets/image/login-border.png);
}

.leaflet-popup-content1 {
  margin: 25px 19px;
  line-height: 1.4;
}

/* 弹窗2 */
.leaflet-popup2 {
  z-index: 4;
  margin-left: 66vw;
  margin-top: 62vh;
  position: absolute;
  text-align: center;
}

.leaflet-popup-close-button2 {
  margin-right: 5px;
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px 4px 0 0;
  text-align: center;
  width: 18px;
  height: 14px;
  font: 16px/14px Tahoma, Verdana, sans-serif;
  color: #c3c3c3;
  text-decoration: none;
  font-weight: bold;
  background: transparent;
}

.leaflet-popup-content-wrapper2 {
  max-height: 250px;
  overflow-y: auto;
  height: 150px;
  padding: 1px;
  text-align: right;
  border-radius: 0px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  background: "";
  background-image: url(../../assets/image/login-border.png);
}

.leaflet-popup-content2 {
  margin: 25px 19px;
  line-height: 1.4;
}

/* 输入框 */
.dtInput {
  margin-top: 6px;
  border-radius: 6vh;
  background-color: transparent;
  color: white;
  text-align: center;
  border: 0.1vh solid white;
  font-size: small;
  width: 220px;
}

#viewer {
  height: 100%;
  width: 65%;
}

#viewer2019 {
  height: 100%;
}

#viewer2020 {
  height: 100%;
}

/* 侧栏 */
.sidebar {
  margin-top: 3%;
  width: 35%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #000;
  scroll-y: auto;
}

/* 侧栏内容 */
.gcontent {
  overflow-x: hidden;
  overflow-y: auto;
  color: #000;
  font-size: 0.7rem;
  font-family: "\5FAE\8F6F\96C5\9ED1", Helvetica, "黑体", Arial, Tahoma;
  height: 100%;
}

/*滚动条样式*/
.gcontent::-webkit-scrollbar {
  width: 8px;
  /*height: 4px;*/
}

.gcontent::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgb(0, 194, 255);
  background: rgb(0, 194, 255);
}

.gcontent::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgb(0, 194, 255);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}

/* 滑动条盒子 */
.sidebar .row {
  width: 100%;
  height: 25%;
  padding: 0.2rem;
  box-sizing: border-box;
  position: relative;
}

/* 侧框标题格式 */
.sidebar .etitle {
  position: absolute;
  z-index: 2;
  margin-top: 3px;
  margin-left: 10px;
  font-size: 30px;
  font-family: Arial;
  font-weight: bold;
  text-shadow: #ffffff 1px 0 0, #ffffff 0 1px 0, #ffffff -1px 0 0,
    #ffffff 0 -1px 0;
}

/* 下拉框 */
@mixin drop-con {
  width: 15vh;
  z-index: 4;
  display: none;
  position: absolute;
  border: 1px solid #444;
  color: #edffff;
  fill: #edffff;
  border-radius: 1vh;
  padding: 1vh 0px;
  cursor: pointer;
  font-size: 0.2rem;
  background-color: rgb(40, 56, 79);
}
.dropbtn {
  @include drop-style;
  margin: 1vh 41vw;
}
#myDropdown {
  margin: 5.5vh 41vw;
}
.dropdown-content {
  @include drop-con;
}

.dropdown-content a {
  color: white;
  text-align: center;
  padding: auto 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
  color: black;
}

.dropdown:hover .dropbtn {
  color: #fff;
  fill: #fff;
  background: #48b;
  border-color: #aef;
  box-shadow: 0 0 8px #fff;
}

/* 下拉框1 */
.dropbtn1 {
  @include drop-style;
  margin: 1vh 49vw;
}
#myDropdown1 {
  margin: 5.5vh 49vw;
}

/* 下拉框2 */
.dropbtn2 {
  z-index: 4;
  width: 10vw;
  position: absolute;
  display: inline-block;
  border: 1px solid #444;
  color: #edffff;
  fill: #edffff;
  border-radius: 0.5vh;
  padding: 1vh 2vh;
  margin: 1vh 45vh;
  cursor: pointer;
  font-size: 0.2rem;
  background-color: rgb(40, 56, 79);
}

.dropdown-content2 {
  width: 10vw;
  z-index: 4;
  display: none;
  position: absolute;
  border: 1px solid #444;
  color: #edffff;
  fill: #edffff;
  border-radius: 0.5vh;
  padding: 1vh 2vh;
  margin: 6vh 45vh;
  cursor: pointer;
  font-size: 0.2rem;
  background-color: rgb(40, 56, 79);
}

.dropdown-content2 a {
  color: white;
  text-align: center;
  padding: auto 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content2 a:hover {
  background-color: #f1f1f1;
  color: black;
}

.dropdown2:hover .dropbtn2 {
  color: #fff;
  fill: #fff;
  background: #48b;
  border-color: #aef;
  box-shadow: 0 0 8px #fff;
}

/* 量测工具栏 */
.dropbtn4 {
  z-index: 4;
  width: 15vh;
  position: absolute;
  display: inline-block;
  border: 0.1vh solid #444;
  color: #edffff;
  fill: #edffff;
  border-radius: 1vh;
  padding: 1vh 0px;
  margin: 1vh 57vw;
  cursor: pointer;
  font-size: 0.2rem;
  background-color: rgb(40, 56, 79);
}

.show {
  display: block;
}

/* 选择框 */
.Select {
  @include button-style;
  margin: 1vh 34.5vw;
}

.Select1 {
  @include button-style;
  margin: 1vh 28vw;
}

.Select2 {
  @include button-style;
  margin: 1vh 21.5vw;
}

.Select3 {
  @include button-style;
  margin: 1vh 15vw;
}

.Select4 {
  @include button-style;
  margin: 1vh 8.5vw;
}

.Select5 {
  @include button-style;
  margin: 1vh 2vw;
}

.Box {
  cursor: pointer;
  height: 10.5px;
}

.text {
  padding-top: 0.5px;
}
</style>
