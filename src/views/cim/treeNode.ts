// // import { MockMethod } from 'vite-plugin-mock';

// import { ref, toRaw } from 'vue';
// import { getBizList } from '/@/api/demo/system';
// import { TableListApi } from '/@/api/menu/repositories/model';
// import { TreeItem } from '/@/components/Tree';

// export function resultSuccess<T = Recordable>(result: T, { message = 'ok' } = {}) {
//   return {
//     code: 0,
//     result,
//     message,
//     type: 'success',
//   };
// }

// const treeData = ref<TreeItem[]>([]);
// const tableListTree = ref<TreeItem[]>([]);

// const reParam = {
//   pageSize: 100,
//   repositoryId: 1,
// };

// const bizList = (async () => {
//   treeData.value = (await getBizList(reParam)).items as unknown as TreeItem[];
//   const result: any[] = [];
//   const str = toRaw(treeData.value);
//   const treeLen = str.length;
//   for (let index = 0; index < treeLen; index++) {
//     result.push({
//       businessObjectCode: str[index].businessObjectCode,
//       bizId: str[index].bizId,
//       bizName: str[index].bizName,
//       children: (async () => {
//         const children: any[] = [];
//         const params = {
//           pageSize: 100,
//           repositoryId: 1,
//           bizId: index,
//         };
//         tableListTree.value = (await TableListApi(params)).items as unknown as TreeItem[];
//         const temp = toRaw(tableListTree.value);
//         const length = temp.length;
//         for (let j = 0; j < length; j++) {
//           children.push({
//             tableCode: temp[j].tableCode,
//           });
//         }
//         return children;
//       })(),
//     });
//   }
//   return result;
// })();

// export default [
//   {
//     url: '/api/system/getTreeList',
//     timeout: 100,
//     method: 'get',
//     response: () => {
//       return resultSuccess(bizList);
//     },
//   },
// ];
