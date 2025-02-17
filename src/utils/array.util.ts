export function findDuplicateIndexes(arr: number[]) {
  let valueCount: any = {};
  let duplicateIndexes = [];

  // Đếm số lần xuất hiện của mỗi giá trị trong mảng
  arr.forEach((value, index) => {
    if (!valueCount[value]) {
      valueCount[value] = [];
    }
    valueCount[value].push(index);
  });

  // Kiểm tra và lưu các chỉ số của các giá trị trùng nhau
  for (let key in valueCount) {
    if (valueCount[key].length > 1) {
      duplicateIndexes.push(...valueCount[key]);
    }
  }

  return duplicateIndexes;
}
