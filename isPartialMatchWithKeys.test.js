import { isPartialMatchWithKeys } from "./isPartialMatchWithKeys.js";

const targetObj = {
  id: 1,
  user: {
    name: "Taro",
    profile: { age: 25, city: "Tokyo" }
  },
  active: true
};

// パターン1: 完全に一致する場合
const check1 = { id: 1, user: { profile: { age: 25 } } };
const result1 = isPartialMatchWithKeys(check1, targetObj);
console.log(result1);
/* 出力結果:
{
  isMatch: true,
  matchedPaths: [
    [ 'id' ],
    [ 'user', 'profile', 'age' ]
  ],
  failedPath: null
}
*/


// パターン2: 途中で値が一致しない場合
const check2 = { user: { profile: { age: 30 } } }; // ageが違う
const result2 = isPartialMatchWithKeys(check2, targetObj);
console.log(result2);
/* 出力結果:
{
  isMatch: false,
  matchedPaths: [],
  failedPath: [ 'user', 'profile', 'age' ]  // ← ここで失敗したことがわかる
}
*/


// パターン3: 存在しないキーをチェックした場合
const check3 = { user: { profile: { country: "Japan" } } };
const result3 = isPartialMatchWithKeys(check3, targetObj);
console.log(result3);
/* 出力結果:
{
  isMatch: false,
  matchedPaths: [],
  failedPath: [ 'user', 'profile', 'country' ] // ← このキーが対象になかったことがわかる
}
*/
