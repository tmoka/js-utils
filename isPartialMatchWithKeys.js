/**
 * obj1 のキーと値が obj2 に存在するか確認し、その結果とキーのパスを返す関数
 * @param {any} obj1 - 基準となるオブジェクト
 * @param {any} obj2 - 比較対象のオブジェクト
 * @param {string[]} [currentPath=[]] - 現在走査しているキーのパス（内部的な再帰用）
 * @returns {object} - { isMatch: boolean, matchedPaths: string[][], failedPath: string[] | null }
 */
export function isPartialMatchWithKeys(obj1, obj2, currentPath = []) {
  // 1. トップレベルの比較（または両方が同じプリミティブ値など）
  if (obj1 === obj2) {
    return { isMatch: true, matchedPaths: [currentPath], failedPath: null };
  }

  // 2. どちらかがオブジェクトでない、または null の場合は不一致
  if (
    typeof obj1 !== 'object' || obj1 === null ||
    typeof obj2 !== 'object' || obj2 === null
  ) {
    return { isMatch: false, matchedPaths: [], failedPath: currentPath };
  }

  let allMatchedPaths = [];

  // 3. obj1 のキーをループして走査
  for (const key of Object.keys(obj1)) {
    // 現在の階層のキーをパスに追加（例: ['user'] -> ['user', 'profile']）
    const path = [...currentPath, key];

    // obj2 にキーが存在しない場合
    if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
      return { isMatch: false, matchedPaths: allMatchedPaths, failedPath: path };
    }

    const val1 = obj1[key];
    const val2 = obj2[key];

    // 両方がオブジェクトの場合は、現在のパスを渡して再帰的にチェック
    if (typeof val1 === 'object' && val1 !== null && typeof val2 === 'object' && val2 !== null) {
      const result = isPartialMatchWithKeys(val1, val2, path);
      
      // 途中で不一致が見つかった場合
      if (!result.isMatch) {
        return {
          isMatch: false,
          matchedPaths: [...allMatchedPaths, ...result.matchedPaths],
          failedPath: result.failedPath
        };
      }
      
      // 一致した場合は、そのパスを蓄積する
      allMatchedPaths = [...allMatchedPaths, ...result.matchedPaths];
    } 
    // 値が一致しない場合（プリミティブ値の比較）
    else if (val1 !== val2) {
      return { isMatch: false, matchedPaths: allMatchedPaths, failedPath: path };
    } 
    // 値が完全に一致した場合
    else {
      allMatchedPaths.push(path);
    }
  }

  // すべてのチェックを通過した場合は true と、蓄積した全パスを返す
  return { isMatch: true, matchedPaths: allMatchedPaths, failedPath: null };
}
