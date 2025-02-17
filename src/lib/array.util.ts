import moment from 'moment';

/** @param
 * unique Nếu không truyền thì mọi element trong array phải là ở dạng `string` | `number` | `boolean` | `null` | `undefined` \
 * Nếu truyền thì sẽ là `key` của `Object`
 */
export const arrayUnique = (arr: any[], uniqueKey?: string) => {
  const flagList = new Set();
  return arr.filter(function (item) {
    if (uniqueKey) {
      const temp = JSON.parse(JSON.stringify(item[uniqueKey])); // parse với case là object ID của mongoDB
      if (!flagList.has(temp)) {
        flagList.add(temp);
        return true;
      }
    } else {
      const temp = JSON.parse(JSON.stringify(item)); // parse với case là object ID của mongoDB
      if (!flagList.has(temp)) {
        flagList.add(temp);
        return true;
      }
    }
  });
};

export const getIndexesOfArrayByValueAndKey = (data: { array: any[]; keyOfArray: string; value: any }) => {
  const indexes = data.array.reduce(function (previousValue, currentValue, index) {
    if (currentValue[data.keyOfArray] === data.value) previousValue.push(index);
    return previousValue;
  }, []);
  return indexes;
};

/**
 * @description
 * convert array thành object với unique key \
 * Nếu pass `keyToValue` thì sẽ lấy giá trị của key đó làm value của object
 */
export const arrayToObject = (arr: any[], uniqueKey: string, keyToValue?: string) => {
  const result: any = {};
  for (const element of arr) {
    if (element[uniqueKey] instanceof Date) {
      const formatKey = moment(element[uniqueKey]).toISOString();
      result[formatKey] = keyToValue ? element[keyToValue] : element;
    } else {
      result[element[uniqueKey]] = keyToValue ? element[keyToValue] : element;
    }
  }
  return result;
};

/**
 * @description
 * convert array thông thường thành object với key chính là value của từng element
 */
export const arrayNormalToObject = (arr: any[]) => {
  const result: any = {};
  for (const element of arr) {
    if (element instanceof Date) {
      const formatKey = moment(element).toISOString();
      result[formatKey] = element;
    } else {
      result[element] = element;
    }
  }
  return result;
};
