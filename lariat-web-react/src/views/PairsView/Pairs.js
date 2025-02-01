
export function intersectingRows(sqlRows1, sqlRows2) {
    function ingestToDict(sqlList) {
        const outDict = {};

        for (let i = 0; i < sqlList.length; i++) {
            const row = sqlList[i];
            const [c1, x1, x2, c2, y1, y2] = row.coordinates.split(",");
            const [x1Int, x2Int, y1Int, y2Int] = [x1, x2, y1, y2].map(Number);

            if (!outDict[c1]) {
                outDict[c1] = [];
            }
            outDict[c1].push([row.name, [x1Int, x2Int, y1Int, y2Int]]);
        }

        return outDict;
    }

    function intervalIntersection(list1, list2) {
        const result = [];
        let i = 0, j = 0;

        while (i < list1.length && j < list2.length) {
            const [name1, [x1Start, x1End, y1Start, y1End]] = list1[i];
            const [name2, [x2Start, x2End, y2Start, y2End]] = list2[j];
            const xOverlap = x1Start <= x2End && x2Start <= x1End;
            const yOverlap = y1Start <= y2End && y2Start <= y1End;

            if (xOverlap || yOverlap) {
                result.push([name1, name2]);
            }
            if (x1End < x2End){
                i++;
            } else {
                j++;
            }
        }

        return result;
    }

    const chrDict1 = ingestToDict(sqlRows1);
    const chrDict2 = ingestToDict(sqlRows2);
    const keys = Array.from({ length: 22 }, (_, i) => `chr${i + 1}`).concat("chrX");
    const intersection = [];

    for (const ch of keys) {
        if (!(chrDict1[ch] && chrDict2[ch])) {
            continue;
        }

        intersection.push(...intervalIntersection(chrDict1[ch], chrDict2[ch]));
    }

    return intersection;
}




export function nonIntersectingRows(sqlRows1, sqlRows2, returnNonIntersectingFrom = 1) {
    function ingestToDict(sqlList) {
        const outDict = {};

        for (let i = 0; i < sqlList.length; i++) {
            const row = sqlList[i];
            const [c1, x1, x2, c2, y1, y2] = row.coordinates.split(",");
            const [x1Int, x2Int, y1Int, y2Int] = [x1, x2, y1, y2].map(Number);

            if (!outDict[c1]) {
                outDict[c1] = [];
            }
            outDict[c1].push([row.name, [x1Int, x2Int, y1Int, y2Int]]);
        }

        return outDict;
    }


    function filterNonIntersecting(list1, list2) {
        const nonIntersecting = [];

        for (let i = 0; i < list1.length; i++) {
            const [name1, [x1Start, x1End, y1Start, y1End]] = list1[i];
            let isIntersecting = false;

            for (let j = 0; j < list2.length; j++) {
                const [name2, [x2Start, x2End, y2Start, y2End]] = list2[j];
                const xOverlap = x1Start <= x2End && x2Start <= x1End;
                const yOverlap = y1Start <= y2End && y2Start <= y1End;

                if (xOverlap || yOverlap) {
                    isIntersecting = true;
                    break;
                }
            }

            if (!isIntersecting) {
                nonIntersecting.push(name1);
            }
        }

        return nonIntersecting;
    }
    const chrDict1 = ingestToDict(sqlRows1);
    const chrDict2 = ingestToDict(sqlRows2);
    const sourceDict = returnNonIntersectingFrom === 1 ? chrDict1 : chrDict2;
    const compareDict = returnNonIntersectingFrom === 1 ? chrDict2 : chrDict1;
    const keys = Array.from({ length: 22 }, (_, i) => `chr${i + 1}`).concat("chrX");
    const nonIntersectingRows = [];

    for (const ch of keys) {
        if (!sourceDict[ch]) {
            continue;
        }
        if (!compareDict[ch]) {
            nonIntersectingRows.push(...sourceDict[ch].map(([name]) => name));
            continue;
        }

        nonIntersectingRows.push(...filterNonIntersecting(sourceDict[ch], compareDict[ch]));
    }

    return nonIntersectingRows;
}

// export function intersectingRows, function filterNonIntersecting;
