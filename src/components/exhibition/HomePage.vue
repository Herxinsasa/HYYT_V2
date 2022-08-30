<!-- 首页 -->
<template>
  <div id="container2">
    <!--数据总概-->
    <div class="con_div">
      <div class="con_div_text left">
        <div class="con_div_text01 left">
          <img src="../../assets/image/info_5.png" class="left text01_img" />
          <div class="left text01_div">
            <p>2019年采点个数</p>
            <p>452</p>
          </div>
        </div>
        <div class="con_div_text01 right">
          <img src="../../assets/image/info_5.png" class="left text01_img" />
          <div class="left text01_div">
            <p>2020年采点个数</p>
            <p>456</p>
          </div>
        </div>
      </div>
      <div class="con_div_text left">
        <div class="con_div_text01 left">
          <img src="../../assets/image/info_5.png" class="left text01_img" />
          <div class="left text01_div">
            <p>选取样点个数</p>
            <p class="sky">60</p>
          </div>
        </div>
        <div class="con_div_text01 right">
          <img src="../../assets/image/info_5.png" class="left text01_img" />
          <div class="left text01_div">
            <p>勘察样点个数</p>
            <p class="sky">3</p>
          </div>
        </div>
      </div>
      <div class="con_div_text left">
        <div class="con_div_text01 left">
          <img src="../../assets/image/info_5.png" class="left text01_img" />
          <div class="left text01_div">
            <p>一级样点个数</p>
            <p class="org">10</p>
          </div>
        </div>
        <div class="con_div_text01 right">
          <img src="../../assets/image/info_5.png" class="left text01_img" />
          <div class="left text01_div">
            <p>待处理个数</p>
            <p class="org">7</p>
          </div>
        </div>
      </div>
    </div>
    <!--统计分析图-->
    <div class="div_any">
      <div class="left div_any01">
        <div class="div_any_child">
          <div class="div_any_title">
            <img src="../../assets/image/title_1.png" />变化类型统计
          </div>
          <div id="chartPie" class="p_chart"></div>
        </div>
        <div class="div_any_child">
          <div class="div_any_title">
            <img src="../../assets/image/title_4.png" />变化状态统计
          </div>
          <div id="chartColumn" class="p_chart"></div>
        </div>
        <div class="div_any_child">
          <div class="div_any_title">
            <img src="../../assets/image/title_2.png" />问题描述
          </div>
          <div class="car_content">
            <p><span>暂无相关信息</span></p>
          </div>
        </div>
      </div>
      <div class="div_any02 left ">
        <div class="div_any_child div_height">
          <div class="div_any_title any_title_width">
            <img src="../../assets/image/title_3.png" />变化信息
          </div>
          <div id="map_div">
            <div id="viewer"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
// import Cesium from "cesium/Source/Cesium.js";
// import "cesium/Source/Widgets/widgets.css";
export default {
  data() {
    return {
      chartColumn: null,
      chartPie: null
    };
  },

  mounted: function() {
    this.drawCharts();
    // 设置静态资源目录
    //加载地球
    var viewer = new Cesium.Viewer("viewer", {
      animation: false, //是否创建动画小器件，左下角仪表
      timeline: false, //是否显示时间轴
      baseLayerPicker: false, //是否显示图层选择器
      fullscreenButton: false, //是否显示全屏按钮
      geocoder: false, //是否显示geocoder小器件，右上角查询按钮
      homeButton: false, //是否显示Home按钮
      infoBox: false, //是否显示信息框
      sceneModePicker: false, //是否显示3D/2D选择器
      selectionIndicator: false, //是否显示选取指示器组件
      navigationHelpButton: false, //是否显示右上角的帮助按钮
      scene3DOnly: true, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
      imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
        url:
          "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
      }) //arcgis基本基本地图加载
    });

    //相机起始位置
    viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(117.4, 40.05, 300000)
    });

    //加载影像
    var imageryLayers = viewer.imageryLayers.addImageryProvider(
      new Cesium.UrlTemplateImageryProvider({
        url:
          "http://localhost:9000/image/917ec0404fda11eb90db7ffe09cd57bb/{z}/{x}/{y}"
      })
    );

    //加载路网
    var roadshp = viewer.imageryLayers.addImageryProvider(
      new Cesium.UrlTemplateImageryProvider({
        url:
          "http://t6.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=6fac5d1bf8ff875eb0b340c8ea860a95"
      })
    );

    //矢量及标签加载
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

    var previousPick = {
      feature: undefined,
      originalColor: new Cesium.Color(),
      outline: false,
      polygon: false
    };

    var infoDiv =
      '<div id="trackPopUp4" style="display:none;" >' +
      '<div id="trackPopUpContent4" class="leaflet-popup4" style="top:5px;left:0;">' +
      '<a class="leaflet-popup-close-button4" href="#">×</a>' +
      '<div class="leaflet-popup-content-wrapper4">' +
      '<div id="trackPopUpLink4" class="leaflet-popup-content4" style="max-width: 300px;"></div>' +
      "</div>" +
      "</div>" +
      "</div>";
    $("#viewer").append(infoDiv);
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
      if (pick && pick.id) {
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

        var ellipsoid = viewer.scene.globe.ellipsoid;
        var location = viewer.camera.pickEllipsoid(event.position, ellipsoid); //将笛卡尔坐标转换为地理坐标
        console.log("笛卡尔坐标:" + location);
        console.log(pick.id);
        $("#trackPopUp4").show(); //显示弹窗
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
        var content =
          '<tr><th style="color:white;">TB_ID:</th><td><input class="dtInput1" " value=' +
          pick.id._properties.TB_ID +
          "></td></tr>" +
          '<tr><th style="color:white;">PRE_ID:</th><td><input class="dtInput1" " value=' +
          pick.id._properties.PRE_ID +
          "></td></tr>" +
          '<tr><th style="color:white;">POST_ID:</th><td><input class="dtInput1" " value=' +
          pick.id._properties.POST_ID +
          "></td></tr>" +
          '<tr><th style="color:white;">类型:</th><td><input class="dtInput1" " value=' +
          pick.id._properties.LX +
          "></td></tr>" +
          '<tr><th style="color:white;">等级:</th><td><input class="dtInput1" " value=' +
          pick.id._properties.Level +
          "></td></tr>" +
          '<tr><th style="color:white;">变化类型:</th><td><input class="dtInput1" " value=' +
          pick.id._properties.BHLX +
          "></td></tr>" +
          '<tr><th style="color:white;">变化面积:</th><td><input class="dtInput1" " value=' +
          pick.id._properties.Area +
          "></td></tr>" +
          '<tr><th style="color:white;">变化体积:</th><td><input class="dtInput1" " value=' +
          pick.id._properties.Volume +
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
              $(".cesium-selection-wrapper4").show();
              $("#trackPopUpLink4").empty();
              $("#trackPopUpLink4").append(obj.content);

              // 弹窗关闭
              $(".leaflet-popup-close-button4").click(function() {
                $("#trackPopUp4").hide();
                $("#trackPopUpLink4").empty();
                $(".cesium-selection-wrapper4").hide();
                if (!handler) {
                  // 如果无handler3D操作，移除当前的trackPopUp
                  $("#trackPopUp4").remove();
                }
              });
              return id;
            }
          }
        }
      } else {
        $("#trackPopUp4").hide();
        pick.id.polygon.show = false;
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  },

  methods: {
    drawColumnChart() {
      this.chartColumn = echarts.init(document.getElementById("chartColumn"));
      this.chartColumn.setOption({
        legend: {
          padding: [6, 0, 0, 0],
          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 12
          }
        },
        tooltip: {},
        dataset: {
          source: [
            [
              "product",
              "大型建筑工地",
              "疑似货运源头",
              "疑似开采点",
              "沙石囤积点"
            ],
            ["面积变化", 11, 1, 18, 18],
            ["新增", 4, 1, 1, 2],
            ["减少", 1, 0, 0, 3]
          ]
        },
        xAxis: [
          {
            type: "category",
            gridIndex: 0,
            axisLine: {
              //这是x轴文字颜色
              lineStyle: {
                color: "#fff"
              },
              axisTick: {
                alignWithLabel: true
              }
            }
          }
        ],
        yAxis: [
          {
            gridIndex: 0,
            axisLine: {
              //这是x轴文字颜色
              lineStyle: {
                color: "#fff"
              },
              axisTick: {
                alignWithLabel: true
              }
            }
          }
        ],
        grid: [
          {
            bottom: "55%"
          },
          {
            top: "55%"
          }
        ],
        series: [
          // These series are in the first grid.
          {
            type: "bar",
            seriesLayoutBy: "row",
            color: "#E67716",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            }
          },
          {
            type: "bar",
            color: "#66ffe8",
            seriesLayoutBy: "row",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            }
          },
          {
            type: "bar",
            color: "#d497ff",
            seriesLayoutBy: "row",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            }
          }
        ],

        barWidth: 10,
        grid: {
          x: "8%",
          y: "27%",
          height: 85,
          width: 400
        } //网格位置
      });
    },
    drawPieChart() {
      this.chartPie = echarts.init(document.getElementById("chartPie"));
      this.chartPie.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["疑似开采点", "沙石囤积点", "大型建筑工地", "疑似货运源头"],
          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 12
          }
        },
        series: [
          {
            name: "类型",
            type: "pie",
            radius: "55%",
            center: ["55%", "50%"],
            data: [
              {
                value: 16,
                name: "大型建筑工地"
              },
              {
                value: 23,
                name: "沙石囤积点",
                itemStyle: {
                  normal: {
                    color: "#ffaa00"
                  }
                }
              },
              {
                value: 2,
                name: "疑似货运源头",
                itemStyle: {
                  normal: {
                    color: "#55ffff"
                  }
                }
              },
              {
                value: 19,
                name: "疑似开采点",
                itemStyle: {
                  normal: {
                    color: "#79b6ff"
                  }
                }
              }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            label: {
              normal: {
                textStyle: {
                  color: "rgba(255, 255, 255, 1)"
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: "rgba(255, 255, 255, 1)"
                }
              }
            }
          }
        ]
      });
    },
    drawCharts() {
      this.drawColumnChart();
      this.drawPieChart();
    }
  }
};
</script>

<style>
@import url("../../assets/css/base.css");

#container2 {
  background-color: #081832;
  height: 100%;
  width: 100%;
}

#chartColumn {
  margin-top: 2.6vh;
  margin-left: 2vh;
  width: 100%;
  height: 100%;
}

#chartPie {
  margin-top: 2.6vh;
  margin-left: 2vh;
  width: 100%;
  height: 100%;
}

#viewer {
  width: 100%;
  height: 100%;
  padding: 2vh 3vh;
}
/* 气泡窗口0*/
.dtInput1 {
  margin-top: 6px;
  border-radius: 6vh;
  background-color: transparent;
  color: white;
  text-align: center;
  border: 0.1vh solid white;
  font-size: small;
  width: 95%;
}

.leaflet-popup4 {
  margin-left: 30px;
  margin-top: 40px;
  position: absolute;
  text-align: center;
  z-index: 4;
}

.leaflet-popup-close-button4 {
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

.leaflet-popup-content-wrapper4 {
  max-height: 300px;
  width: 300px;
  overflow-y: auto;
  height: 220px;
  padding: 1px;
  text-align: right;
  border-radius: 0px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  background: "";
  background-image: url(../../assets/image/login-border.png);
}

.leaflet-popup-content4 {
  margin: 15px 19px;
  line-height: 1.4;
}
</style>
