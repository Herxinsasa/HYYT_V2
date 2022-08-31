<!-- 数据界面 -->
<template>
  <div id="container4">
    <div class="div_b">
      <!-- 			<el-input v-model="search" placeholder="输入编号"></el-input> -->
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        border
        style="width: 100%"
      >
        <el-table-column label="序号" prop="OBJECTID"> </el-table-column>
        <el-table-column label="编号" prop="TB_ID"> </el-table-column>
        <!-- 				<el-table-column label="变化" prop="BHMC">
				</el-table-column> -->
        <el-table-column label="变化类型" prop="BHLX"> </el-table-column>
        <el-table-column label="变化面积(m²)" prop="Area"> </el-table-column>
        <el-table-column label="变化率" prop="Change_Per"> </el-table-column>
        <el-table-column label="变化等级" prop="Level"> </el-table-column>
        <el-table-column label="行政区名" prop="ZN"> </el-table-column>
        <el-table-column label="村名称" prop="CM"> </el-table-column>
        <el-table-column align="right">
          <!-- 					<template slot="header">
						<el-input v-model="search" size="mini" placeholder="输入编号" />
					</template> -->
          <template slot-scope="scope">
            <el-button size="mini" @click="exportWord(scope.row)"
              >导出</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="block" style="margin-top:15px;">
        <el-pagination
          align="center"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 5, 8]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import JSZipUtils from "jszip-utils";
import { saveAs } from "file-saver";
export default {
  data() {
    return {
      tableData: [],
      search: "",
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 8 // 每页的数据条数
    };
  },
  mounted() {
    //需要其他数据通过修改json或者生成新的json数据
    var Data = require("../../assets/json/BH2021.json");
    var that = this;
    Data.features.forEach(function(v) {
      that.tableData.push(v.attributes);
    });
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    // 点击导出word
    exportWord: function(row) {
      console.log(row);
      let that = this;
      // 读取并获得模板文件的二进制内容
      JSZipUtils.getBinaryContent("../../static/checkRecord.docx", function(
        error,
        content
      ) {
        // model.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
        // 抛出异常
        if (error) {
          throw error;
        }

        // 创建一个PizZip实例，内容为模板的内容
        let zip = new PizZip(content);
        // 创建并加载docxtemplater实例对象
        let doc = new docxtemplater().loadZip(zip);
        // 设置模板变量的值
        doc.setData({
          table: row //接口返回数据（word需要填充的真实数据）
        });

        try {
          // 用模板变量的值替换所有模板变量
          doc.render();
        } catch (error) {
          // 抛出异常
          let e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties
          };
          console.log(
            JSON.stringify({
              error: e
            })
          );
          throw error;
        }

        // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
        let out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });
        // 将目标文件对象保存为目标类型的文件，并命名
        saveAs(out, "外业核查表.docx");
      });
    }
  }
};
</script>

<style lang="scss">
#container4 {
  /* background: url(../../assets/image/dataAdministration-back1.png); */
  background-color: #081832;
  width: 100%;
  height: 100%;
}

.tit {
  background-color: #034c6a;
  border-radius: 18px;
  position: absolute;
  height: 60px;
  width: 500px;
  color: #ffffff;
  font-weight: bold;
  font-size: 20px;
  left: 20%;
  line-height: 30px;
  text-align: center;
  margin-top: 8px;
  margin-left: 220px;
}

/* 	#tt{
		padding-top: 120px;
		height: 200px;
	} */

/* 	表头和背景色 */
.el-table th {
  background-color: #034c6a !important;
}
.el-table tr {
  background-color: #034c6a;
  max-height: 3vh;
  /* 		background: url(../../assets/image/dataAdministration-back1.png); */
}

.el-table {
  margin-top: 1vh;
  position: relative;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  margin-top: 8vh;
  margin-left: 10vh;
  max-height: 90vh;
  max-width: 90vw;
  font-size: 0.2rem;
  color: #ffffff;
}

.el-table th > .cell {
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  vertical-align: middle;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  font-weight: bold;
}

.el-table td,
.el-table th.is-leaf {
  /* background-color: #FFFFFF; */
  color: #ffffff;
}

.el-table th > .cell {
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  vertical-align: middle;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
}

.el-pagination__total {
  margin-right: 10px;
  font-weight: 400;
  color: #ffffff;
}

.el-pagination__jump {
  margin-left: 24px;
  font-weight: 400;
  color: #ffffff;
}

/* 导航 */
.el-pagination {
  white-space: nowrap;
  float: right;
  color: #303133;
  font-weight: 700;
  width: 600px;
  margin-right: 160px;
}

.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #0b254d !important;
}

.div_b {
  width: 100%;
  height: 80%;
  box-shadow: -10px 0px 15px #034c6a inset, 0px -10px 15px #034c6a inset,
    10px 0px 15px #034c6a inset, 0px 10px 15px #034c6a inset;
  border: 1px solid #034c6a;
  box-sizing: border-box;
  position: absolute;
  margin-top: 6.5vh;
}

.el-table td,
.el-table th.is-leaf {
  color: #ffffff;
  max-height: 20px;
}
</style>
