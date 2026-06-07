---
title: "Java刷题总结"
date: 2026-06-07T12:24:00+08:00
author: "LiuWhite"
tags: ["Java", "算法", "LeetCode", "刷题", "数据结构"]
categories: ["技术"]
description: "整理自 LiuWhite 的算法与数据结构刷题总结，包含经典排序算法、双指针、滑动窗口、KMP、链表与二叉树等常考面试题解。"
draft: false
weight: 2
---

例题：LC(leetcode)、NC(newcoder)、OJ(OnlineJudge)、JZ(剑指Offer)

[TOC]

# 排序算法

<img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWFnZXMyMDE4LmNuYmxvZ3MuY29tL2Jsb2cvODQ5NTg5LzIwMTgwNC84NDk1ODktMjAxODA0MDIxMzM0MzgyMTktMTk0NjEzMjE5Mi5wbmc?x-oss-process=image/format,png" alt="img" style="zoom:50%;" />

## 插入排序

从头开始，当前位置元素往前找可插入的位置，进行插入

```java
public class InsertSort {
    public static void main(String[] args) {
        int[] nums = {8, 7, 9, 10, 33, 7, 54, 2, 8, 0, 6, 1};
        insertSort(nums);
        System.out.println(Arrays.toString(nums));
    }
    private static void insertSort(int[] nums) {
        int tmp;
        for (int i = 1; i < nums.length; i++) {
            //从之前排序的元素中查找是否有可插入位置,比前一项小才需要插入
            //后序遍历
            tmp = nums[i];
            int j = i - 1;
            while (j >= 0 && nums[j] > tmp) {
                nums[j + 1] = nums[j];
                j--;
            }
            nums[j + 1] = tmp;
        }
    }
}
```

## 希尔排序

```java
//希尔排序
//分组的直接插入排序
public class ShellSort {
    public static void main(String[] args) {
        int[] nums = {8, 7, 9, 10, 33, 7, 54, 2, 8, 0, 6, 1};
        sheelSort(nums);
        System.out.println(Arrays.toString(nums));
    }
    private static void shellSort(int[] nums) {
        int len = nums.length;
        while (len != 0) {
            len = len / 2;
            for (int i = 0; i < len; i++) {
                for (int j = i + len; j < nums.length; j += len) {
                    int k = j - len;
                    int tmp = nums[j];
                    for (; k >= 0 && tmp < nums[k]; k -= len) {
                        nums[k + len] = nums[k];
                    }
                    nums[k + len] = tmp;
                }
            }
        }
    }
}
```

## 选择排序

```java
public class SelectSort {
    public static void main(String[] args) {
        int[] nums = {8, 7, 9, 10, 33, 7, 54, 2, 8, 0, 6, 1};
        selectSort(nums);
        System.out.println(Arrays.toString(nums));
    }
    private static void selectSort(int[] nums) {
        //每次选择最小的更新到队头
        for (int i = 0; i < nums.length; i++) {
            int min = nums[i];
            int index = i;
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[j] < min) {
                    min = nums[j];
                    index = j;
                }
            }
            nums[index] = nums[i];
            nums[i] = min;
        }
    }
}
```



## 堆排序

```java
public class HeapSort {
    public static void main(String[] args) {
        int[] nums = {8, 7, 9, 10, 33, 7, 54, 2, 8, 0, 6, 1};
        heapSort(nums);
        System.out.println(Arrays.toString(nums));
    }

    private static void heapSort(int[] nums) {
        //构造大顶堆，然后顶部最大元素和最小叶子交换节点，再继续构造大顶堆，如此往复
        for (int i = nums.length / 2 - 1; i >= 0; i--) {//第一个非叶子节点开始
            adjustHeap(nums, i, nums.length);
        }
        //调整堆结构
        for (int i = nums.length - 1; i >= 0; i--) {
            swap(nums, 0, i);//顶部与末尾元素交换
            adjustHeap(nums, 0, i);//交换一次之后长度少1
        }
    }
    private static void adjustHeap(int[] nums, int i, int length) {
        int tmp = nums[i];//取出当前元素
        for (int j = 2 * i + 1; j < length; j = 2 * j + 1) {//j节点的左子节点开始
            if (j + 1 < length && nums[j] < nums[j + 1]) { j++; }
            if (nums[j] > tmp) {
                nums[i] = nums[j];
                i = j;
            } else {
                break;
            }
            nums[i] = tmp;
        }
    }
    private static void swap(int[] nums, int i, int j) {
        int tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
    }
}
```

## 快速排序

```java
//选择第一个数为p，小于p的数放在左边，大于p的数放在右边。
//递归的将p左边和右边的数都按照第一步进行，直到不能递归。 单边递归快于双边递归
public class QuickSort {
    public static void main(String[] args) {
        int[] nums = {8, 7, 9, 10, 33, 7, 54, 2, 8, 0, 6, 1};
        quickSort(nums, 0, nums.length-1);
        System.out.println(Arrays.toString(nums));
    }

    private static void quickSort(int[] nums, int start, int end) {
        //用到了递归
        while (start < end) {
//            int mid = nums[start];//选择头数值将数组二分
//            int tmp;
            int l = start, r = end;
            int mid = nums[start];
            int tmp;
            System.out.println("本次：mark：" + mid);
            while (l <= r) {
                while (nums[l] < mid && l < end) { l++; }//从左往右找到第一个大>=mid的
                while (nums[r] > mid && r > start) { r--; }//从右往左找到第一个<=mid的
                if (l <= r) {
                    tmp = nums[l];
                    nums[l] = nums[r];
                    nums[r] = tmp;
                    l++;
                    r--;
                }
                System.out.println(Arrays.toString(nums));
            }
            quickSort(nums, l, end);
            end = r;
        }
    }
}
```



## 归并排序

```java
//分治思想
public class MergeSort {
    public static void main(String[] args) {
        int[] nums = {8, 7, 9, 10, 33, 7, 54, 2, 8, 0, 6, 1};
        mergeSort(nums, 0, nums.length - 1);
        System.out.println(Arrays.toString(nums));
    }
    private static void mergeSort(int[] nums,int left, int right) {
        int[] tmp = new int[nums.length];//修改结果直接按照分组的取快改造到临时数组上
        if (left < right) {
            int mid = (left + right) / 2;
            mergeSort(nums, left, mid);
            mergeSort(nums, mid + 1, right);
            //合并两个有序数组 也可以单写一个函数
            int i = left;//左半边起点
            int j = mid + 1;//右半边起点
            int t = 0;//临时指针
            while (i <= mid && j <= right) { tmp[t++] = (nums[i] <= nums[j]) ? nums[i++] : nums[j++]; }
            while (i <= mid) { tmp[t++] = nums[i++]; }
            while (j <= right) { tmp[t++] = nums[j++]; }
            t = 0;
            //copy到原数组
            while (left <= right) { nums[left++] = tmp[t++]; }
//            merge(nums, left, right, mid, tmp);
        }
    }
}
```



## 冒泡

```java
public class BubbleSort {
    public static void main(String[] args) {
        int[] nums = {8, 7, 9, 10, 33, 7, 54, 2, 8, 0, 6, 1};
        bubbleSort(nums);
        System.out.println(Arrays.toString(nums));
    }
    private static void bubbleSort(int[] nums) {
        //每次从前往后冒泡
        int tmp;
        for (int i = 0; i < nums.length; i++) {
            for (int j = 0; j < nums.length - i - 1; j++) {
                if (nums[j] > nums[j + 1]) {
                    tmp = nums[j];
                    nums[j] = nums[j + 1];
                    nums[j + 1] = tmp;
                }
            }
        }
    }
}
```



# 数组

数组是存放在**连续内存空间**上的相同类型数据的集合。

数组可以方便的通过**下标索引的方式**获取到下标下对应的数据。

- 数组下标都是从0开始的。
- 数组内存空间的地址是连续的
- 数组的元素是不能删的，只能覆盖。

## 1、二分查找

​	定义left、right，再据此定义mid迭代更新

### 例题：LC704

给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。

```java
public class LC704 {
    public static void main(String[] args) {
        int[] nums = {-1, 0, 3, 5, 9, 12};
        int target = 9;
        int l = 0, r = nums.length-1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid]<target) l = mid;
            else if (nums[mid]>target){ r = mid;}
            else{
                System.out.println( mid );
                break;
            }
        }
        System.out.println(-1);
    }
}
```

例题：

### 模板

普通模板

```java
search(int[] nums, int target) {
        int left = 0,right = nums.size() - 1; // 定义target在左闭右闭的区间里，[left, right]
        while (left <= right) { // 当left==right，区间[left, right]依然有效，所以用 <=
            int middle = left + ((right - left) / 2);// 防止溢出 等同于(left + right)/2
            if (nums[middle] > target) {right = middle - 1; // target 在左区间，所以[left, middle - 1]
            } else if (nums[middle] < target) {left = middle + 1; // target 在右区间，所以[middle + 1, right]
            } else { return middle; // 数组中找到目标值，直接返回下标 }
        }
        return -1;      // 未找到目标值
}
```

000111模板	找到于0最接近的那个1，即从右往左找

```java
search(int[] nums, int target) {
        int left = 0,right = nums.size() - 1; 		 // 定义target在左闭右闭的区间里，[left, right]
        while (left != right) { 				    //在排好序的队列中查询，所以要找到相邻边界，用不等于
            int mid = (left + right) >> 1;			 // 等同于(left + right)/2
            if (nums[mid] >= target) { right = mid; } //右端逼近，更新右端为mind
            else { left = mid + 1 }
        }
        return r;  
}
```

111000模板	找到于0最接近的那个1，即从左往右找

```java
search(int[] nums, int target) {
        int left = 0,right = nums.size() - 1; 		// 定义target在左闭右闭的区间里，[left, right]
        while (left != right) { 				   //在排好序的队列中查询，所以要找到相邻边界，用不等于
            int mid = (left + right) >> 1;			// 等同于(left + right)/2
            if (nums[mid] <= target) { left = mid; } //左端逼近，更新左端为mid
            else { right = mid - 1 }
        }
        return r;  
}
```

## 2、移除元素（快慢指针）

快慢指针是简单的以空间换时间，多一个index可以在一次遍历中完成数组的一些更新、赋值操作

### 例题：LC27

给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。

不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并**原地**修改输入数组。

```java
public class LC27 {
    public static void main(String[] args) {
        int[] nums = {0, 1, 2, 2, 3, 0, 4, 2};
        int val = 2;
        int slow = 0;
        for (int fast = 0; fast < nums.length; fast++) {
            //如果遇到val，无操作，fast越过该位置，下一次直接slow更新为fast位置元素即可
            if (nums[fast] != val) {
                nums[slow] = nums[fast];
                slow++;
            }
        }
        System.out.println(slow);
    }
}
```

**快慢指针**是**双指针**的一种，还有一种常见的双指针是从两边开始向里遍历，给出简单典例：

**LC977 有序数组的平方**

给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

示例 1： 输入：nums = [-4,-1,0,3,10] 输出：[0,1,9,16,100] 解释：平方后，数组变为 [16,1,0,9,100]，排序后，数组变为 [0,1,9,16,100]

```java
class Solution {
    public int[] sortedSquares(int[] nums) {
        int right = nums.length - 1, left = 0;
        int[] result = new int[nums.length];
        int index = result.length - 1;
        while (left <= right) {
            if (nums[left] * nums[left] > nums[right] * nums[right]) {
                result[index--] = nums[left] * nums[left];
                ++left;
            } else {
                result[index--] = nums[right] * nums[right];
                --right;
            }
        }
        return result;
    }
}
```

例题：

## 3、滑动窗口

所谓滑动窗口，**就是不断的调节子序列的起始位置和终止位置，从而得出我们要想的结果**。

此类方法往往是解决子集之和或者连续序列问题

### 例题：LC209

给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，并返回其长度。如果不存在符合条件的子数组，返回 0。

示例：输入：s = 7, nums = [2,3,1,2,4,3] 输出：2 解释：子数组 [4,3] 是该条件下的长度最小的子数组。

```java
public static void main(String[] args) {
        int target = 7;
        int[] nums = {2, 3, 1, 2, 4, 3};
        int l = 0 , sum = 0;
        int sublength = Integer.MAX_VALUE;
        for (int r = 0; r < nums.length; r++) {
            sum += nums[r];
            while (sum >= target) {
                sublength = Math.min(sublength, r - l + 1);
                sum -= nums[l++];
            }
        }
        System.out.println(sublength == Integer.MAX_VALUE ? 0 : sublength);
    }
```

相关题目：LC904、LC76

## 4、螺旋矩阵

模拟顺时针画矩阵的过程:

- 填充上行从左到右
- 填充右列从上到下
- 填充下行从右到左
- 填充左列从下到上               由外向内一圈一圈这么画下去。

可以发现这里的**边界条件**非常多：上下左右

一圈下来，要画四条边，每画一条边都要坚持一致的左闭右开，或者左开又闭的原则，这样这一圈才能按照统一的规则画下来。

### 例题：LC59

定一个正整数 n，生成一个包含 1 到 n 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵。

示例: 输入: 3 输出: [ [ 1, 2, 3 ], [ 8, 9, 4 ], [ 7, 6, 5 ] ]

```java
//螺旋矩阵 上下左右
//直观方法
import java.util.Arrays;
public class LC59 {
    public static void main(String[] args) {
        int n = 3;
        int[][] Matrix = new int[n][n];
        int x = 0;
        int left = 0, right = n - 1, top = 0, bottom = n - 1;
        while (left <= right && bottom >= top) {
            //i hang j lie
            //left->right
            for (int i=left; i <= right; i++) {
                Matrix[top][i] = x++;
            }
            for (int j = top+1; j <= bottom; j++) {
                Matrix[j][right] = x++;
            }
            if (left < right && bottom > top) {
                for (int i = right - 1; i > left; i--) {
                    Matrix[bottom][i] = x++;
                }
                for (int j = bottom; j > top; j--) {
                    Matrix[j][left] = x++;
                }
            }
            top++; right--; bottom--; left++;
        }
        for (int i = 0; i < n; i++) {
            System.out.println(Arrays.toString(Matrix[i]));
        }
    }
}
//简单结构
public static void main(String[] args) {
        int n = 4;
        int[][] Matrix = new int[n][n];
        int x=1, tar = n * n;
        int l = 0, r = n - 1, t = 0, b = n - 1;
        while (x <= tar) {
            for (int i = l; i <= r; i++) { Matrix[t][i]=x++; }
            t++;
            for (int j = t; j <= b; j++) { Matrix[j][r]=x++; }
            r--;
            for (int i = r; i >= l; i--) { Matrix[b][i]=x++; }
            b--;
            for (int j = b; j >= t; j--) { Matrix[j][l]=x++; }
            l++;
        }
        for (int i = 0; i < n; i++) {
            System.out.println(Arrays.toString(Matrix[i]));
        }

    }

```

相关题目：LC54、LC855、JZ29

## 5、删除重复项

删除重复项在暴力思路中十分简单，总结两种典型题型

#### 例题：LC80

给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使每个元素 最多出现两次 ，返回删除后数组的新长度。不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成

该题采用**快慢指针**，根据指针差值来确定个数，不满足的则fast指针continue，进入下一步，和**移除元素**操作类似

```java
 public int removeDuplicates(int[] nums) {
        int len = nums.length;
        if (len <= 2) {return len;}
        int slow = 2, fast = 2;
        while (fast < len) {
            if (nums[fast] != nums[slow - 2]) {
                nums[slow] = nums[fast];
                slow++;
            }
            fast++;
        }
        return slow;
}
```

#### 例题：JZ03

找出数组中重复的数字。


在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

示例 1：		输入：[2, 3, 1, 0, 2, 5, 3]			输出：2 或 3 

“ 一个萝卜一个坑 ” 思想

```java
public int findRepeatNumber(int[] nums) {
        //Set<Integer> dic = new HashSet<>();
        //for(int num : nums) {
        //    if(!dic.add(num)) return num;
        //    }
        //return -1;
        int i = 0;
        while(i < nums.length) {
            if(nums[i] == i) {
                i++;
                continue;
            }
            if(nums[nums[i]] == nums[i]) return nums[i];
            int tmp = nums[i];   //以下三行操作就是将各自数字放到自己所在位置上去
            nums[i] = nums[tmp];
            nums[tmp] = tmp;
        }
        return -1;
 }

```





## 6、约瑟夫环  ⭐

**递归、迭代**

![约瑟夫环1.png](https://pic.leetcode-cn.com/d7768194055df1c3d3f6b503468704606134231de62b4ea4b9bdeda7c58232f4-%E7%BA%A6%E7%91%9F%E5%A4%AB%E7%8E%AF1.png)

```java
class Solution {
    public int lastRemaining(int n, int m) {
        int ans = 0;
        // 最后一轮剩下2个人，所以从2开始反推
        for (int i = 2; i <= n; i++) {
            ans = (ans + m) % i;
        }
        return ans;
    }
}
```


递推公式的导出： 
$$
f(n,m) = [f(n-1, m) + m] % n
$$
从低开始推。



## 7、循环数组不能相邻取数，能得到的最大和是多少

是代码随想录中打家劫舍的题目，本质上是一个动态规划问题

```java
//打家劫舍II  环形数组
public class LC213 {
    public int rob(int[] nums) {
        if (nums.length==0) return 0;
        if (nums.length == 1) return nums[0];
        if (nums.length == 2) {
            return Math.max(nums[0], nums[1]);
        }
        //返回第一家不偷和最后一家不偷的最大值
        
        return Math.max(robLine(nums, 0, nums.length - 2), robLine(nums, 1, nums.length - 1));

    }

    private int robLine(int[] nums, int head, int tail) {
        //动态数组法，更好理解
        if (head == tail) { return nums[head]; }
        int[] dp = new int[nums.length];
        dp[head] = nums[head];
        dp[head + 1] = Math.max(nums[head + 1], dp[head]);
        for (int i = head + 2; i <= tail; i++) {
            dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
        }
        return dp[tail];
//迭代法
        int d0 = nums[head], d1 = Math.max(nums[head + 1], d0);
        for (int i = head+2; i <= tail; i++) {
            int tmp = d1;
            d1 = Math.max(d1, d0 + nums[i]);
            d0 = tmp;
        }
        return d1;

    }
}
```

## 8、和为K的子数组 （前缀和+哈希表）

给定一个整数数组和一个整数 **k，**你需要找到该数组中和为 **k** 的连续的子数组的个数。

```java
class Solution {
    public int subarraySum(int[] nums, int k) {
        int count = 0, pre = 0;
        HashMap<Integer, Integer> map = new HashMap<>();//<前缀和，-->
        map.put(0, 1);
        for (int num : nums) {
            pre += num;
            if (map.containsKey(pre - k)) {
                count += map.get(pre - k);
            }
            map.put(pre, map.getOrDefault(pre, 0) + 1);
        }
        return count;
    }
}
```

## 9、优美子数组

给你一个整数数组 nums 和一个整数 k。如果某个 连续 子数组中恰好有 k 个奇数数字，我们就认为这个子数组是「优美子数组」。请返回这个数组中「优美子数组」的数目。

countodd[] 记录的是到i之前，出现奇数次数是oddnum次的子数组的个数。

```java
class Solution {
    public int numberOfSubarrays(int[] nums, int k) {
        int n = nums.length;
        int[] countodd = new int[n+1];
        int oddnum = 0, ans = 0;
        countodd[0] = 1;
        for (int i = 0; i < n; i++) {
            oddnum += nums[i] & 1;
            ans += oddnum >= k ? countodd[oddnum - k] : 0;
            countodd[oddnum] += 1;
        }
        return ans;
    }
}
```



# 字符

## 0、反转字符串系列

LC344 简单的反转字符串，直接双指针位置交换即可。

LC541 反转字符串II 每隔k个字符残k个字符 双指针的赋值要遍历更新，其他同上原理交换反转即可

### LC151 翻转字符串里的单词

示例 1：			输入: 	"the sky is blue"			输出: 	"blue is sky the"

```java
public String reverseWords(String s) {
    StringBuffer res = new StringBuffer();
    char[] c = s.trim().toCharArray();//去掉首尾空格
    for (int i = 0; i < c.length; i++) {
        if (c[i] != ' ' || res.charAt(res.length() - 1) != ' ') {
            res.append(c[i]);//w为字母或者为空格但前面无空格是才加入
        }
    }
    //得到正常语句
    StringBuffer ans = new StringBuffer();
    String[] str = res.toString().split(" ");
    for (int i = str.length - 1; i > 0; i--) {
        ans.append(str[i]);
        ans.append(" ");
    }
    ans.append(str[0]);
    return ans.toString();
}
```

**JZ58II 左旋字符串**

示例 1：输入: s = "abcdefg", k = 2				输出: "cdefgab"

示例 2：输入: s = "lrloseumgh", k = 6			输出: "umghlrlose"

<img src="C:\Users\23143\AppData\Roaming\Typora\typora-user-images\image-20210706104601343.png" alt="image-20210706104601343" style="zoom:70%;" />

```java
public String reverseLeftWords(String s, int n) {
    int left1 = 0, right1 = n - 1, left2 = n, right2 = s.length() - 1;
    char[] c = s.toCharArray();
    reverse(left1, right1, c);
    reverse(left2, right2, c);
    reverse(0, s.length() - 1, c);
    return String.valueOf(c);
}
private void reverse(int left, int right, char[] s) {
    while (left < right) {
        s[left] ^= s[right];
        s[right] ^= s[left];
        s[left] ^= s[right];
        left++;
        right--;
    }
}
```

## 1、KMP算法⭐

KMP由：Knuth，Morris和Pratt，所以取了三位学者名字的首字母。

### 1.1**应用场景**

KMP主要应用在字符串匹配上。

KMP的主要思想是**当出现字符串不匹配时，可以知道一部分之前已经匹配的文本内容，可以利用这些信息避免从头再去做匹配。**

所以如何记录已经匹配的文本内容，是KMP的重点，也是 **next数组** 肩负的重任。

### 1.2**前缀表**

next数组就是一个前缀表（prefix table）（可以理解为遍历中用于剪枝）

前缀表是用来**回退**的，它记录了模式串与主串(文本串)不匹配的时候，模式串应该从哪里开始重新匹配。

前缀表具有告诉我们当前位置匹配失败，跳到之前已经匹配过的地方的能力。

#### 如何计算前缀表

例子：要在文本串：aab**aabaaf**a 中查找是否出现过一个模式串：aabaaf

前缀是指不包含最后一个字符的所有以第一个字符开头的连续子串；

后缀是指不包含第一个字符的所有以最后一个字符结尾的连续子串。

<img src="https://camo.githubusercontent.com/9ce37d3e9ac54e3ff2d4af9f765451d03982f161546ffc488774f2fe135b18f8/68747470733a2f2f636f64652d7468696e6b696e672e63646e2e626365626f732e636f6d2f706963732f4b4d50254537254232254245254538254145254232382e706e67" alt="KMP精讲8" style="zoom:67%;" />

模式串与前缀表对应位置的数字表示的就是：**下标i之前（包括i）的字符串中，有多大长度的相同前缀后缀**

- 如 i=1：aab中：前缀：a、aa 	 后缀： ab、b  所以为0
- 如 i=4：aabaa中： 前缀：**a**、**aa**、aab、aaba  后缀：abaa、baa、**aa**、**a**  所以为2

next数组就可以是前缀表，但是很多实现都是把前缀表统一减一（右移一位，初始位置为-1）之后作为next数组。

### 1.3代码实现

**构造next数组**

1. 初始化
2. 处理前后缀不相同的情况
3. 处理前后缀相同的情况

```java
public void getNext(int[] next, String s){
    //初始化   定义两个指针i和j，j指向前缀起始位置，i指向后缀起始位置
        int j = -1;
        next[0] = j;
        for (int i = 1; i<s.length(); i++){// 注意i从1开始
            while(j>=0 && s.charAt(i) != s.charAt(j+1)){// 前后缀不相同了
                j=next[j];// 向前回退
            }
            if(s.charAt(i)==s.charAt(j+1)){	j++; }
            next[i] = j;
        }
    }
```

**使用next数组来做匹配**

在文本串字符串中找出模式串出现的第一个位置 (从0开始)，所以返回当前在文本串匹配模式串的位置i 减去 模式串的长度，就是文本串字符串中出现模式串的第一个位置。

LC28

```java
 public int strStr(String haystack, String needle) {
        if(needle.length()==0){
            return 0;
        }
        int[] next = new int[needle.length()];
        getNext(next, needle);	//构造next数组
        int j = -1;	// 因为next数组里记录的起始位置为-1
        for(int i = 0; i<haystack.length();i++){  // 注意i就从0开始
            while(j>=0 && haystack.charAt(i) != needle.charAt(j+1)){
                j = next[j];//不匹配则回退到之前找到匹配的位置
            }
            if(haystack.charAt(i)==needle.charAt(j+1)){
                j++;	//同时往后移动
            }
            if(j==needle.length()-1){ // 文本串s里出现了模式串t
                return (i-needle.length()+1);
            }
        }
        return -1;
    }
```

### 1.4重复的子字符串

LC459 重复的子字符串

给定一个非空的字符串，判断它是否可以由它的一个子串重复多次构成。给定的字符串只含有小写英文字母，并且长度不超过10000。

- 示例 1:	输入: "abab"	输出: True	解释: 可由子字符串 "ab" 重复两次构成。
- 示例 2:	输入: "aba"	输出: False

思路：数组长度减去最长相同前后缀的长度相当于是第一个周期的长度，也就是一个周期的长度，如果这个周期可以被整除，就说明整个数组就是这个周期的循环。

```java
public boolean repeatedSubstringPattern(String s) {
        if (s.equals("")) return false;
        int len = s.length();
        // 原串加个空格(哨兵)，使下标从1开始，这样j从0开始，也不用初始化了
        s = " " + s;
        char[] chars = s.toCharArray();
        int[] next = new int[len + 1];
        // 构造 next 数组过程，j从0开始(空格)，i从2开始
        for (int i = 2, j = 0; i <= len; i++) {
            // 匹配不成功，j回到前一位置 next 数组所对应的值
            while (j > 0 && chars[i] != chars[j + 1]) j = next[j];
            // 匹配成功，j往后移
            if (chars[i] == chars[j + 1]) j++;
            // 更新 next 数组的值
            next[i] = j;
        }
        // 最后判断是否是重复的子字符串，这里 next[len] 即代表next数组末尾的值
        if (next[len] > 0 && len % (len - next[len]) == 0) {
            return true;
        }
        return false;
    }
```

## 2、01序列

给定一个01序列，0101110011，以及一个数字k，可以将最多k个0转变为1，问转变之后最长的1的连续序列的长度

思路：定位第一个0和k+1个0的位置，之间的长度就是所需长度，一次遍历取最大

```java
public static void main(String[] args) {
        String s = "01001110011010101";
        int k = 3;
        int left = 0, right = -1, count = 0;
        while (count <= k) { if (s.charAt(++right)=='0') count++; }//结束时再第k+1个0的位置
        int max_length = right - left;
        System.out.println(max_length);
        while (right < s.length()) {
//            while (left < s.length() && s.charAt(left++) == '1') { }//就是对left做加1操作，直到left指向下一个0
            while (left < s.length()) {
                if (s.charAt(left) == '0') {
                    left++;
                    break;
                } else {
                    left++;
                }
            }

//            while (++right < s.length() && s.charAt(right) == '1') { }//对right做加1操作，知道right指向下一个0
            right++;
            while (right < s.length()) {
                if (s.charAt(right) == '0') {
                    break;
                } else {
                    right++;
                }
            }
            max_length = Math.max(max_length, right - left);
        }
        System.out.println(max_length);
    }


//极简代码
class Solution {
   public boolean repeatedSubstringPattern(String s) {
        String str = s + s;
        return str.substring(1, str.length() - 1).contains(s);
	}
}

```

## 3、[ 最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/)

给你一个字符串 `s`，找到 `s` 中最长的回文子串。

**中心扩展法**

![image-20210624144658792](C:\Users\23143\AppData\Roaming\Typora\typora-user-images\image-20210624144658792.png)

```java
class Solution {
    public String longestPalindrome(String s) {
        if (s.length() < 2) { return s; }
        int start = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            int len1 = centerAppend(s, i, i);
            int len2 = centerAppend(s, i, i + 1);
            int len = Math.max(len1, len2);
            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substring(start, end + 1);
    }

    private  int centerAppend(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        return right - left - 1;
    }
}
```

## 4、[Z 字形变换](https://leetcode-cn.com/problems/zigzag-conversion/)

将一个给定字符串 `s` 根据给定的行数 `numRows` ，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 `"PAYPALISHIRING"` 行数为 `3` 时，排列如下：

```
P     A     H     N
A  P  L  S  I  I  G
Y     I     R
```

**模拟其过程即可 **    关键在于应用flag来实现掉头操作

```java
public String convert(String s, int numRows) {
        if(numRows <2)return s;
        int len = s.length();
        List<StringBuilder> res = new ArrayList<>();
        for (int i = 0; i < numRows; i++) {
            res.add(new StringBuilder());
        }
        int i = 0, flag = -1;
        for (char c : s.toCharArray()) {
            res.get(i).append(c);
            if (i == 0 || i == numRows - 1) { flag = -flag; }//掉头
            i += flag;
        }
        StringBuilder ans = new StringBuilder();
        for (StringBuilder row : res) { ans.append(row); }
        return ans.toString();
    }
```

## 5、[字符串转换整数 (atoi)](https://leetcode-cn.com/problems/string-to-integer-atoi/)

每次读取一位数字就先计算判定一次，这样可以使用不超过Int大小的空间就可以实现判断是否越界。

同时节省了不必要算力。

```java
class Solution {
    public int myAtoi(String s) {
        s = s.trim();//去掉前导空格
        if (s.length() < 1) {
            return 0;
        }
        int flag = 1;
        int begin = 0;
        if (s.charAt(0) == '-') {
            flag = -1;
            begin=1;
        } else if (s.charAt(0) == '+') {
            begin = 1;
        }
        int ans = 0;
        StringBuilder res = new StringBuilder();
        for (int i = begin; i < s.length(); i++) {
            char cur = s.charAt(i);
            if (cur < '0' || cur > '9') { break; }
            if (ans > Integer.MAX_VALUE / 10 || (ans == Integer.MAX_VALUE / 10 && (cur - '0') > Integer.MAX_VALUE % 10)) {
                return Integer.MAX_VALUE;
            }
            if (ans < Integer.MIN_VALUE / 10 || (ans == Integer.MIN_VALUE / 10 && (cur - '0') > -(Integer.MIN_VALUE % 10))) {
                return Integer.MIN_VALUE;
            }

            ans = ans * 10 + flag * (cur - '0');

        }

        return ans;
    }
}
```





# 链表

## 0、基础知识

链表是一种通过指针串联在一起的线性结构，每一个节点是又两部分组成，一个是数据域一个是指针域（存放指向下一个节点的指针），最后一个节点的指针域指向null（空指针的意思）。

链接的入口点称为列表的头结点也就是head。

<img src="C:\Users\23143\AppData\Roaming\Typora\typora-user-images\image-20210705144114358.png" alt="image-20210705144114358" style="zoom:66%;" />

**链表类型**

单链表、双链表、循环链表

**存储方式**

数组是在内存中是连续分布的，但是链表在内存中是**不连续分布**的。

链表是通过指针域的指针链接在内存中各个节点。所以链表中的节点在内存中不是连续分布的 ，而是散乱分布在内存中的某地址上，分配机制取决于**操作系统的内存管理**。

**链表的定义**

```java
// Definition for singly-linked list.
public class ListNode {
     int val;
     ListNode next;
     ListNode() {}
     ListNode(int val) { this.val = val; }
     ListNode(int val, ListNode next) { 
         this.val = val; this.next = next; 
	}
}
```

## 1、设计链表

### 例题：LC707

实现对链表的 取、增（头、尾）、删（头、尾）

- get(index)：获取链表中第 index 个节点的值。如果索引无效，则返回-1。
- addAtHead(val)：在链表的第一个元素之前添加一个值为 val 的节点。插入后，新节点将成为链表的第一个节点。
- addAtTail(val)：将值为 val 的节点追加到链表的最后一个元素。
- addAtIndex(index,val)：在链表中的第 index 个节点之前添加值为 val 的节点。如果 index 等于链表的长度，则该节点将附加到链表的末尾。如果 index 大于链表长度，则不会插入节点。如果index小于0，则在头部插入节点。
- deleteAtIndex(index)：如果索引 index 有效，则删除链表中的第 index 个节点

```java
class MyLinkedList {
    int size;//链表长度
    ListNode head;//链表
    //初始化链表  即无构造方法
    public MyLinkedList() {
        size = 0;
        head = new ListNode(0);
    }
    //获取第i个节点值
    public int get(int index) {
        if (index<0||index>=size) return -1;
        ListNode cur = head;
        for (int i = 0; i <= index; i++) { cur = cur.next; }
        return cur.val;
    }
    //前插头节点
    public void addAtHead(int val) {addAtIndex(0,val)}
    //后插尾节点
    public void addAtTail(int val) {addAtIndex(size,val);}
    //按位置index插入节点
    public void addAtIndex(int index, int val) {
        if (index > size) return;
        if (index < 0) { index = 0; }
        size++;
        ListNode pred = head;
        for (int i = 0; i < index; i++) { pred = pred.next; }
        ListNode toAdd = new ListNode(val);
        toAdd.next = pred.next;
        pred.next = toAdd;
    }
    //删除第index个节点
    public void deleteAtIndex(int index) {
        if (index < 0 || index >= size) return;
        size--;
        ListNode pred = head;
        for (int i = 0; i < index; i++) { pred = pred.next; }
        pred.next = pred.next.next;//跳过该节点衔接。
    }
}
```

## 2、移除链表元素

引入**虚拟头节点**方法：

### 例题：LC203

题意：删除链表中等于给定值 val 的所有节点。

示例 1：	输入：	head = [1,2,6,3,4,5,6], val = 6			输出：	[1,2,3,4,5]

主要思想就是双指针，一个指向当前节点，一个指向下一节点，若下一节点是删除目标，则当前指向像一个的next

```java
public ListNode removeElements(ListNode head, int val) {
        while (head != null && head.val == val) { head = head.next; }//边界条件删除
        if (head == null) { return head; }
        ListNode pre = head;
        ListNode cur = head.next;
        while (cur != null) {
            if (cur.val == val) { pre.next = cur.next; }
            else { pre = cur; }
            cur = cur.next;
        }
        return head;//返回一个链表 返回头节点即可，pre、cur为虚拟节点，负责head进行更改操作
    
//虚拟头节点方法
       while (head != null && head.val == val) { head = head.next; }
        if (head == null) { return head; }
        ListNode res = new ListNode(0);
        res.next = head;
        ListNode pre = res;
        ListNode cur = head;
        while (cur != null) {
            if (cur.val==val) pre.next = cur.next;
            else pre = cur;
            cur = cur.next;
        }
        return res.next;
    }
```

## 3、反转链表

### 例题：LC206

```
反转一个单链表。   示例: 	输入: 1->2->3->4->5->NULL 		输出:	 5->4->3->2->1->NULL
```

```java
public ListNode reverseList(ListNode head) {
        ListNode pre = null;
        ListNode cur = head;
        while (cur != null) {
            ListNode tmp=cur.next;//翻转操作
            cur.next = pre;//更新指针
            pre = cur;
            cur = tmp;
        }
        return pre;
    }
```

### 反转链表II	

给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 

```java
public class LC92 {
    public ListNode reverseBetween(ListNode head, int left, int right) {
        ListNode dummy = new ListNode(-1);
        dummy.next = head;
        ListNode from = dummy;
        ListNode to = dummy;
        for (int i = 0; i < left - 1; i++) {    from = from.next;  }
        for (int i = 0; i < right; i++) {  to = to.next;   }
        ListNode pre = to.next;
        ListNode cur = from.next;
        for (int i = 0; i < right - left + 1; i++) {
            ListNode tmp = cur.next;
            cur.next = pre;
            pre = cur;
            cur = tmp;
        }
        from.next = pre;
        return dummy.next;
    }
}
```



## 4、两两交换链表中的节点

例题：LC24

给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

```java
public ListNode swapPairs(ListNode head) {
        //设置一个虚拟头节点
        ListNode dummyHead = new ListNode(0);
        dummyHead.next = head;//虚拟节点指向头节点
        ListNode cur = dummyHead;
        while (cur.next != null && cur.next.next != null) {
            ListNode tmp1 = cur.next;//中间变量用于实现交换
            ListNode tmp2 = cur.next.next.next;//记录下一个指针地址
            //step1  交换操作
            cur.next = cur.next.next;
            cur.next.next = tmp1;
            //step2 下一步读取
            cur.next.next.next = tmp2;//复位
            //移位两步  进行下一轮交换
            cur = cur.next.next;
        }
        return dummyHead.next;

    }
```

## 5、链表相交

给定两个（单向）链表，判定它们是否相交并返回交点。请注意相交的定义基于节点的引用，而不是基于节点的值。换句话说，如果一个链表的第k个节点与另一个链表的第j个节点是同一节点（引用完全相同），则这两个链表相交。

思路：若又存在相同链表，那么从相同点之后一直到结尾都是相同的，所以需要对其操作，较长的连表现将指针移位到比较短的唱出来部分的位置，使得对比之前，二者剩余长度一致。

```java
public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        int lenA = 0, lenB = 0;
        ListNode curA = headA;
        ListNode curB = headB;
    //先计算两个链表的长度
        while (curA != null) {
            lenA++;
            curA = curA.next;
        }
        while (curB != null) {
            lenB++;
            curB = curB.next;
        }
        curA = headA;
        curB = headB;
        //调整使得 A表示较长链表
        if (lenB > lenA) {
            //1. swap (lenA, lenB);
            int tmpLen = lenA;
            lenA = lenB;
            lenB = tmpLen;
            //2. swap (curA, curB);
            ListNode tmpNode = curA;
            curA = curB;
            curB = tmpNode;
        }
        // 求长度差
        int gap = lenA - lenB;
        while (gap-- > 0) {
            curA = curA.next;
        }
        while (curA != null) {
            if (curA == curB) {
                return curA;
            }
            curA = curA.next;
            curB = curB.next;
        }
        return null;
    }
```

## 6、环形链表 ⭐

给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。为了表示给定链表中的环，使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。

例题：LC142、141

思路：

1、判断是否有环：

可以使用**快慢指针法**， 分别定义 fast 和 slow指针，从头结点出发，fast指针每次移动两个节点，slow指针每次移动一个节点，如果 fast 和 slow指针在途中相遇 ，说明这个链表有环。

2、寻找环的入口：

<img src="https://camo.githubusercontent.com/0c6e7f151c5324fca67245440e3f15d76209496a3744604287feff7226645f4e/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f32303231303331383136323933383339372e706e67" alt="img" style="zoom: 67%;" />

相遇时： slow指针走过的节点数为: `x + y`， fast指针走过的节点数：` x + y + n (y + z)`，n为fast指针在环内走了n圈才遇到slow指针， （y+z）为 一圈内节点的个数A。

因为fast指针是一步走两个节点，slow指针一步走一个节点， 所以 fast指针走过的节点数 = slow指针走过的节点数 * 2：

```
(x + y) * 2 = x + y + n (y + z)
```

两边消掉一个（x+y）: `x + y = n (y + z)`

所以要求x ，将x单独放在左面：`x = n (y + z) - y` ,

再从n(y+z)中提出一个 （y+z）来，整理公式之后为如下公式：`x = (n - 1) (y + z) + z `注意这里n一定是大于等于1的，因为 fast指针至少要多走一圈才能相遇slow指针。

先拿n为1的情况来举例，意味着fast指针在环形里转了一圈之后，就遇到了 slow指针了。

当 n为1的时候，公式就化解为 `x = z`

**fast相对于slow是一次移动一个节点，所以不可能跳过去**

**说明**：不允许修改给定的链表

```java
public class Solution {
    public ListNode detectCycle(ListNode head) {
        ListNode fast=head;
        ListNode slow=head;
        while (fast != null && fast.next != null) {
            slow = slow.next;//慢指针每次一步
            fast = fast.next.next;//快指针一次两步
            //相遇后做以下操作来确定环开始的节点
            if (slow == fast) {
                ListNode index1 = fast;
                ListNode index2 = head;
                while (index1 != index2) {
                    index1 = index1.next;
                    index2 = index2.next;
                }
                return index2;//当二者相等时，表示再走该圈剩余的步数和开始进入到该圈的距离是一样的 
            }
        }
        return null;
//set方法
        // Set<ListNode> set = new HashSet<>();
        // while (head != null) {
        //     if (!set.add(head)) { return head; }
        //     head = head.next;
        // }
        // return null;
    }   
}
```

## 7、旋转链表

```java
class Solution {
    public ListNode rotateRight(ListNode head, int k) {
        if (k == 0 || head == null || head.next == null) {
            return head;
        }
        int n = 1;
        ListNode iter = head;
        while (iter.next != null) {
            iter = iter.next;
            n++;
        }
        int add = n - k % n;
        if (add == n) {
            return head;
        }
        iter.next = head;
        while (add-- > 0) {
            iter = iter.next;
        }
        ListNode ret = iter.next;
        iter.next = null;
        return ret;
        
//自写方法
        if(head==null||k==0||head.next==null) return head;
        ListNode fast = head;
        ListNode slow = head;
        int n=1;
         ListNode iter=head;
         //计算链表长度n
         while(iter.next!=null){
             iter=iter.next;
             n++;
         }
        k = k % n;
        while (k > 0) {
            fast = fast.next;
            k--;
        }
        while (fast.next != null) {
            fast = fast.next;
            slow = slow.next;
        }
        fast.next = head;
        ListNode res = slow.next;
        slow.next = null;
        return res;
    }
}
```

# 哈希表

## 0、基础知识

哈希表   英文名字为Hash table，国内也有译为散列表

一般哈希表都是用来快速判断一个元素**是否出现**集合里

**哈希碰撞**

​	A和B都映射到了索引下表 1的位置，这一现象叫做**哈希碰撞**

​	解决方法：

- ​	**拉链法**：

​	A和B在索引1的位置发生了冲突，发生冲突的元素都被存储在链表中。 这样我们就可以通过索引找到A和B

<img src="https://camo.githubusercontent.com/fe53b20a1b7bc1251e66916085ddfa3dcaee407155a7c431c8e92882b6585e37/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f32303231303130343233353031353232362e706e67" alt="img" style="zoom: 50%;" />

- ​	**线性试探法**：

  使用线性探测法，一定要保证tableSize大于dataSize。 我们需要依靠哈希表中的空位来解决碰撞问题。

例如冲突的位置，放了A，那么就向下找一个空位放置B的信息。所以要求tableSize一定要大于dataSize ，要不然哈希表上就没有空置的位置来存放 冲突的数据了。

**常见结构**

数组、集合、映射

判断元素知否出现中，空间换时间的典型应用

## 1、有效字母异位词

LC242

给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。

示例 1: 输入: s = "anagram", t = "nagaram" 输出: true

示例 2: 输入: s = "rat", t = "car" 输出: false                         

 只包含小写字母

**暴力无脑法**

```java
public boolean isAnagram(String s, String t) {
    if(s.length()!=t.length()) return false;
    char[] c1 = s.toCharArray();
    char[] c2 = t.toCharArray();
    Arrays.sort(c1);
    Arrays.sort(c2);
    return Arrays.equals(c1, c2);
}
```

**哈希设计法**

设计一个存储26个字母的数组，一次遍历填入s1对应字母个数，第二次遍历减去s2对应字母数字，最后判断是否刚刚好（全为0）

```java
public boolean isAnagram(String s, String t) {
    int[] dic = new int[26];
    for (char c : s.toCharArray()) { dic[c - 'a'] ++; }
    for (char c : t.toCharArray()) { dic[c - 'a'] --; }
    for (int d : dic) if (d != 0) { return false; }
    return true;
```

相关例题：LC383



## 2、两个数组的交集

LC349

给定两个数组，编写一个函数来计算它们的交集。

```
输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2]
```

```java
public int[] intersection(int[] nums1, int[] nums2) {
    Set<Integer> set = new HashSet<>();
    Set<Integer> res = new HashSet<>();
    for (int n : nums1) { set.add(n); }
    for (int n : nums2) {
        if (set.contains(n)) { res.add(n);}
    }
    return res.stream().mapToInt(Integer::intValue).toArray();
}
```

## 3、快乐数

LC202

「快乐数」定义为：对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和，然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。如果 可以变为 1，那么这个数就是快乐数。如果 n 是快乐数就返回 True ；不是，则返回 False 。

**示例：**		输入：19   输出：true

```
1^2 + 9^2 = 82
8^2 + 2^2 = 68
6^2 + 8^2 = 100
1^2 + 0^2 + 0^2 = 1
```

思路：如果不是快乐数，有的数字回无限循环，这就需要set来记录用以避免该情况

```java
public class LC202 {
    public boolean isHappy(int n) {
        Set<Integer> set = new HashSet<>();
        while (n != 1 && !set.contains(n)) {
            set.add(n);
            n = getNextnum(n);
        }
        return n == 1;
    }
    private int getNextnum(int n) {
        int res = 0;
        char[] c = String.valueOf(n).toCharArray();//按位去数字小技巧：转字符数组
        for (char i : c) {res+=(i-'0')*(i-'0');}
        return res;
    }
}
```

## 4、两数之和 ⭐

LC349

给定一个整数数组 nums 和一个目标值 target，请在该数组中找出和为目标值 target 的那两个整数，并返回他们的数组下标。可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

**思路：**

map记录的是(值,下标)  对每个i，目标值减去该值后的值是否在map中，若在则说明之前已经入栈，读取其下标为res[0]，该i为res[1]

```java
public int[] twoSum(int[] nums, int target) {
        int[] res = new int[2];//返回值初始化{0，0} 记录返回的index
        if (nums == null || nums.length == 0) { return res; }
        Map<Integer, Integer> map = new HashMap<>();//(值,下标)
        for (int i = 0; i < nums.length; i++) {
            int tmp = target - nums[i];
            if (map.containsKey(tmp)) {
                res[1] = i;
                res[0] = map.get(tmp);
            }
            map.put(nums[i], i);
        }
        return res;
    }
```

## 5、四数之和

给定四个包含整数的数组列表 A , B , C , D ,计算有多少个元组 (i, j, k, l) ，使得 A[i] + B[j] + C[k] + D[l] = 0。

为了使问题简单化，所有的 A, B, C, D 具有相同的长度 N，且 0 ≤ N ≤ 500 。

例如:

```
输入:		A = [ 1, 2]		B = [-2,-1]		C = [-1, 2]		D = [ 0, 2]
输出:		2
解释: 两个元组如下:
1. (0, 0, 0, 1) -> A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0
2. (1, 1, 0, 0) -> A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0
```

```java
public int fourSumCount(int[] nums1, int[] nums2, int[] nums3, int[] nums4) {
        Map<Integer, Integer> map = new HashMap<>();
        int tmp;
        int res = 0;
        //统计量数组中元素之和，同时统计出现的次数，放入map
        for (int i : nums1) {
            for (int j : nums2) {
                tmp = i + j;
                if (map.containsKey(tmp)) { map.put(tmp, map.get(tmp) + 1); }
                else{ map.put(tmp, 1); }
            }
        }
        //重复，再统计剩下两个元素和，同时记录次数
        for (int i : nums3) {
            for (int j : nums4) {
                tmp = i + j;
                if (map.containsKey(-tmp)) { res+=map.get(-tmp); }
            }
        }
        return res;
    }
```







# 栈与队列

队列是先进先出，栈是先进后出

<img src="https://camo.githubusercontent.com/363cdde8c6b61a1c156e6c978b2957f80ba61bcdcb1bdeaa9c706b5bb82ea15b/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f32303231303130343233353334363536332e706e67" alt="img" style="zoom:67%;" />

先进后出的数据结构，在遍历操作中，一般不会用到冗余空间，需要多少用到多少。其特性可以用于记录上一个特殊状态

## 1、用栈实现队列

LC232

使用栈实现队列的下列操作：

- push(x) -- 将一个元素放入队列的尾部。
- pop() -- 从队列首部移除元素。
- peek() -- 返回队列首部的元素。
- empty() -- 返回队列是否为空。

```java
public class LC232 {
    Deque<Integer> INstack;
    Deque<Integer> OUTstack;
    public void MyQueue() {
        INstack = new ArrayDeque<>();
        OUTstack = new ArrayDeque<>();
    }
    /** Push element x to the back of queue. */
    public void push(int x) {
        INstack.push(x);
    }
    /** Removes the element from in front of queue and returns that element. */
    public int pop() {
        if (OUTstack.isEmpty()) {
            while (!INstack.isEmpty()) {
                OUTstack.push(INstack.pop());
            }
        }
        return OUTstack.pop();
    }
    /** Get the front element. */
    public int peek() {
        int res = this.pop();
        OUTstack.push(res);
        return res;
    }
    /** Returns whether the queue is empty. */
    public boolean empty() {
        return INstack.isEmpty() && OUTstack.isEmpty();
    }
}
```

## 2、用队列实现栈

```java
class MyStack {
    Queue<Integer> queue1; // 和栈中保持一样元素的队列
    Queue<Integer> queue2; // 辅助队列
    /** Initialize your data structure here. */
    public MyStack() {
        queue1 = new LinkedList<>();
        queue2 = new LinkedList<>();
    }  
    /** Push element x onto stack. */
    public void push(int x) {
        queue2.offer(x); // 先放在辅助队列中
        while (!queue1.isEmpty()){
            queue2.offer(queue1.poll());
        }
        Queue<Integer> queueTemp;
        queueTemp = queue1;
        queue1 = queue2;
        queue2 = queueTemp; // 最后交换queue1和queue2，将元素都放到queue1中
    }
    /** Removes the element on top of the stack and returns that element. */
    public int pop() {
        return queue1.poll(); // 因为queue1中的元素和栈中的保持一致，所以这个和下面两个的操作只看queue1即可
    } 
    /** Get the top element. */
    public int top() {
        return queue1.peek();
    }
    /** Returns whether the stack is empty. */
    public boolean empty() {
        return queue1.isEmpty();
    }
}
/**
 * Your MyQueue object will be instantiated and called as such:
 * MyQueue obj = new MyQueue();
 * obj.push(x);
 * int param_2 = obj.pop();
 * int param_3 = obj.peek();
 * boolean param_4 = obj.empty();
 */
```



## 3、括号画家

基于LC20:有效括号的升级版

OJ265
Candela 是一名漫画家，她有一个奇特的爱好，就是在纸上画括号。这一天，刚刚起床的 Candela 画了一排括号序列，其中包含小括号 `()`、中括号 `[]` 和大括号 `{}`，总长度为 N。这排随意绘制的括号序列显得杂乱无章，于是 Candela 定义了什么样的括号序列是美观的：

```
 1. 空的括号序列是美观的；
 2. 若括号序列 `A` 是美观的，则括号序列 `(A)、[A]、{A}` 也是美观的；
 3. 若括号序列 `A、B` 都是美观的，则括号序列 `AB` 也是美观的；
```

例如 `[(){}]()` 是美观的括号序列，而 `)({)[}](` 则不是。

ps: 用两个栈来实现:

1、一个栈用来判断是否构成美观括号序列

2、另一个栈同步记录开始构成美观序列的序号从而记录对应的长度,当之后的是连续的美观序列时，不会入栈序号，当有不是的出现，会重新入栈序号，此后在遇到美观序列，末尾序号减去栈顶序号就是新的子序列的长度。

```java
//括号画家
//计算一个括号序列中符合规则的最长子序列长度
public class OJ265 {
    public static void main(String[] args) {
        String input= "(((({}[]((()";
        char[] c = input.toCharArray();

        Stack<Character> stk = new Stack<>();
        stk.push('#');
        Stack<Integer> num = new Stack<>();
        num.push(-1);
        int ans = 0;
        for (int i = 0; i < c.length; i++) {
            if (c[i] == stk.peek() + 1 || c[i] == stk.peek() + 2) {
                stk.pop();
                num.pop();
                ans = Math.max(ans, i - num.peek());
            } else {
                stk.push(c[i]);
                num.push(i);
            }
        }
        System.out.println(ans);
    }
}

```

## 4、逆波兰表达式求值

根据 逆波兰表示法，求表达式的值。

有效的运算符包括 + , - , * , / 。每个运算对象可以是整数，也可以是另一个逆波兰表达式。

整数除法只保留整数部分。 给定逆波兰表达式总是有效的。换句话说，表达式总会得出有效数值且不存在除数为 0 的情况。  

- 示例 1： 输入: ["2", "1", "+", "3", " * "] 输出: 9 解释: 该算式转化为常见的中缀算术表达式为：((2 + 1) * 3) = 9
- 示例 2： 输入: ["4", "13", "5", "/", "+"] 输出: 6 解释: 该算式转化为常见的中缀算术表达式为：(4 + (13 / 5)) = 6

```java
public int evalRPN(String[] tokens) {
        Stack<Integer> stack = new Stack<>();
        for (String t : tokens) {
            char c = t.charAt(0);
            //不是数字时就是运算符
            if (!(t.length() == 1 && c < '0' || c > '9')) { stack.push(Integer.valueOf(t)); }
            else {
                int b = stack.pop();
                int a = stack.pop();
                if (c=='+'){ stack.push(a + b);}
                if (c=='-'){ stack.push(a - b);}
                if (c=='*'){ stack.push(a * b);}
                if (c=='/'){ stack.push(a / b);}
            }
        }
        return stack.pop();
}
```

## 5、滑动窗口最大值-单调队列⭐

LC239：滑动窗口最大值

给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。返回滑动窗口中的最大值。

示例 1：输入：nums = [1,3,-1,-3,5,3,6,7], k = 3输出：[3,3,5,5,6,7]

```
解释：滑动窗口的位置           最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```

```java
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Stack;
//滑动窗口最大值  顶堆  hard
public class LC239 {
    public int[] maxSlidingWindow(int[] nums, int k) {
        if(nums.length==1) return nums;
        int len = nums.length - k + 1;//res长度
        int[] res = new int[len];
        int index = 0;
        MyQueue myQueue = new MyQueue();
        //先初始化，放入前k个数字
        for (int i = 0; i < k; i++) { myQueue.add(nums[i]); }
        res[index++] = myQueue.peek();
        //滑动窗口
        for (int i = k; i < nums.length; i++) {
            myQueue.poll(nums[i-k]);//离开窗口
            myQueue.add(nums[i]);//进入窗口
            res[index++] = myQueue.peek();
        }
        return res;

    }
}

class MyQueue {
    //构造一个能实现相应操作的队列或者栈的存储方式
    Deque<Integer> deque = new ArrayDeque<>();
    //弹出元素，前提是要弹出的数值是否等于队列的出口数值，如果是，则弹出
    void poll(int val) {
        if (!deque.isEmpty() && val == deque.peek()) {
            deque.poll();
        }
    }
    //压入元素,若由比之前大的则取而代之成为最后一个位置，即peek
    void add(int val) {
        while (!deque.isEmpty() && val > deque.getLast()) {
            //即将加入的值于队列尾部比较
            deque.removeLast();//去掉所有比这个新值小的尾部
        }
        deque.add(val);//加入顶部或者比其更大的值后面
    }
    //队列顶上是最大值
    int peek() {
        return deque.peek();
    }

}
```

直接调用优先级队列实现

```java
class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        PriorityQueue<int[]> pq = new PriorityQueue<int[]>(new Comparator<int[]>() {
            public int compare(int[] pair1, int[] pair2) {
                return pair1[0] != pair2[0] ? pair2[0] - pair1[0] : pair2[1] - pair1[1];
            }
        });
        for (int i = 0; i < k; ++i) {
            pq.offer(new int[]{nums[i], i});
        }
        int[] ans = new int[n - k + 1];
        ans[0] = pq.peek()[0];
        for (int i = k; i < n; ++i) {
            pq.offer(new int[]{nums[i], i});
            while (pq.peek()[1] <= i - k) {
                pq.poll();
            }
            ans[i - k + 1] = pq.peek()[0];
        }
        return ans;
    }
}
```



## 6、顶堆（优先级队列）

**优先级队列**：其实**就是一个披着队列外衣的堆**，因为优先级队列对外接口只是从队头取元素，从队尾添加元素，再无其他取元素的方式，看起来就是一个队列。而且优先级队列内部元素是自动依照元素的权值排列。

**堆**：是一颗完全二叉树，树中每个结点的值都不小于（或不大于）其左右孩子的值。 如果父亲结点是大于等于左右孩子就是**大顶堆**，小于等于左右孩子就是**小顶堆**。

可以直接用 **PriorityQueue**（优先级队列）就可以了，底层实现都是一样的，从小到大排就是小顶堆，从大到小排就是大顶堆。

**LC347: 前k个高频元素**

给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。你可以按 任意顺序 返回答案。

```
示例 :输入: nums = [1,1,1,2,2,3], k = 2				输出: [1,2]
```

思路：

1. 要统计元素出现频率
2. 对频率排序
3. 找出前K个高频元素

代码：

```java
//前 K 个高频元素
//小顶堆方法 超过k个就移除
public class LC347 {
    public int[] topKFrequent(int[] nums, int k) {
        int[] res = new int[k];
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int num : nums) { map.put(num, map.getOrDefault(num, 0) + 1); }

        Set<Map.Entry<Integer, Integer>> entries = map.entrySet();
        //根据根据value排序 构建小顶堆
        PriorityQueue<Map.Entry<Integer, Integer>> queue = new PriorityQueue<>((o1, o2) -> o1.getValue() - o2.getValue());
        //正序，小的在堆顶   反序则是大顶堆
        //map迭代器 根据value排序
        for (Map.Entry<Integer, Integer> entry : entries) {
            queue.offer(entry);
            if (queue.size() > k) {
                queue.poll();
            }
        }
        for (int i = k - 1; i >= 0; i--) {
            res[i] = queue.poll().getKey();//根据值返回键
        }
        return res;

    }
}

```

# 二叉树

代码地址：D:\java学习\CodingTrain\src\BinaryTree

## 0、基础知识

### 0.1种类

- 满二叉树：
- 完全二叉树：
- 二叉搜索树
- 平衡二叉搜索树

### 0.2存储方式

- 链式存储：通过指针把分布在散落在各个地址的节点串联一起
- 顺序存储：内存是连续分布

顺序存储采用数组存储：层序遍历的结构

<img src="https://camo.githubusercontent.com/1dd58317f3f36c2a649fcac642e19529d71f082df94511d1d85a03d229482e10/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f32303230303932303230303432393435322e706e67" alt="img" style="zoom:40%;" />



**如果父节点的数组下表是i，那么它的左孩子就是i \* 2 + 1，右孩子就是 i \* 2 + 2。**

但是用链式表示的二叉树，更有利于我们理解，所以一般我们都是用链式存储二叉树。

### 0.3遍历方式

**这两种遍历是图论中最基本的两种遍历方式**

- 深度优先遍历
  - 前序遍历（递归法，迭代法）
  - 中序遍历（递归法，迭代法）
  - 后序遍历（递归法，迭代法）
- 广度优先遍历
  - 层次遍历（迭代法）

在深度优先遍历中：有三个顺序，前中后序遍历，**这里前中后，其实指的就是中间节点的遍历顺序**。

- 前序遍历：中左右
- 中序遍历：左中右
- 后序遍历：左右中

<img src="https://camo.githubusercontent.com/2d9958dba205749538b8183bdb3c848a14093a18e70d75d2393efa47ee514520/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f32303230303830363139313130393839362e706e67" alt="img" style="zoom:33%;" />

### 0.4二叉树的定义

```java
public class TreeNode {
    int val;
  	TreeNode left;
  	TreeNode right;
  	TreeNode() {}
  	TreeNode(int val) { this.val = val; }
  	TreeNode(int val, TreeNode left, TreeNode right) {
    		this.val = val;
    		this.left = left;
    		this.right = right;
  	}
}
```

## 一、遍历方式

### 1、二叉树的递归遍历（DFS）

主体函数：

```java
ArrayList<Integer> Reverse(TreeNode root) {
        ArrayList<Integer> result = new ArrayList<Integer>();
        traval(root, result);
        return result;
    }
```

终止条件：

```java
if (cur==null) return
```

确定单层递归逻辑(以中序为例)

```java
res.push(cur.val);//中
tarval(cur.left);//左
travel(cur.right);//右
```

#### 1.1前序遍历	preorder

```java
void preOrder(TreeNode root, ArrayList<Integer> result) {
        if (root == null) {return;}
        result.add(root.val);           // 中左右
        preOrder(root.left, result);
        preOrder(root.right, result);
   	}
```

#### 1.2中序遍历	inorder

```java
void inOrder(TreeNode root, ArrayList<Integer> result) {
        if (root == null) {return;}
        inOrder(root.left, result);		// 左中右
        result.add(root.val); 
        inOrder(root.right, result);
   	}
```

#### 1.3后序遍历	postorder

```java
void postOrder(TreeNode root, ArrayList<Integer> result) {
        if (root == null) {return;}
        postOrder(root.left, result);	// 左右中
        postOrder(root.right, result);
   	    result.add(root.val); 
   	}
```

### 2、递归的栈实现

#### 2.1前序遍历	preorder

```java
public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();	//存储输出顺序
        if (root == null){ return result;}
        Stack<TreeNode> stack = new Stack<>();	//用栈进行遍历操作
        stack.push(root);					//入栈根节点
        while (!stack.isEmpty()){
            TreeNode node = stack.pop();	//取出父节点
            result.add(node.val);		   //先进行值的存入再将其子节点按照遍历顺序入栈
            if (node.right != null){
                stack.push(node.right);
            }
            if (node.left != null){
                stack.push(node.left);
            }
        }
        return result;
    }
```

#### 2.2中序遍历	inorder

```java
public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null){return result;}
        Stack<TreeNode> stack = new Stack<>();
        TreeNode cur = root;
        while (cur != null || !stack.isEmpty()){
           if (cur != null){		//访到最底层
               stack.push(cur);
               cur = cur.left;
           }else{
               cur = stack.pop();
               result.add(cur.val);
               cur = cur.right;
           }
        }
        return result;
    }
```

#### 2.3后序遍历	postorder

<img src="https://camo.githubusercontent.com/fb9492d2de573a3b93e13c1dbad73e2d799eb50dc54c10a82ea34d97fac27913/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f32303230303830383230303333383932342e706e67" alt="前序到后序" style="zoom:50%;" />

```java
public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null){ return result;}
        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);
        while (!stack.isEmpty()){
            TreeNode node = stack.pop();
            result.add(node.val);
            if (node.left != null){
                stack.push(node.left);
            }
            if (node.right != null){
                stack.push(node.right);
            }
        }
        Collections.reverse(result);
        return result;
    }
```

#### 2.4 统一写法模板

```java
public List<Integer> Traversal(TreeNode root) {
  	    List<Integer> result = new LinkedList<>();
      Stack<TreeNode> st = new Stack<>();
      if (root != null) st.push(root);
      while (!st.empty()) {
          TreeNode node = st.peek();
          if (node != null) {
//--------------------------------------------------------------------------------------------
              //前序
              st.pop(); 					// 将该节点弹出，避免重复操作，下面再将右中左节点添加到栈中
              if (node.right!=null) st.push(node.right);  // 添加右节点（空节点不入栈）
              if (node.left!=null) st.push(node.left);    // 添加左节点（空节点不入栈）
              st.push(node);                          // 添加中节点
              st.push(null); 				// 中节点访问过，但是还没有处理，加入空节点做为标记。  
//--------------------------------------------------------------------------------------------   
              //中序
              st.pop(); 
              if (node.right!=null) st.push(node.right); 
              st.push(node);                          
              st.push(null); 
              if (node.left!=null) st.push(node.left);   
//--------------------------------------------------------------------------------------------  
              //后序
			 st.pop(); 
              st.push(node);                         
              st.push(null); 
              if (node.right!=null) st.push(node.right);  
              if (node.left!=null) st.push(node.left);    
//--------------------------------------------------------------------------------------------               
          } else { // 只有遇到空节点的时候，才将下一个节点放进结果集
              st.pop();           // 将空节点弹出
              node = st.peek();    // 重新取出栈中元素
              st.pop();
              result.add(node.val); // 加入到结果集
          }
      }
      return result;
  }
```

### 3、层序遍历

需要借用一个辅助数据结构即**队列**来实现，**队列先进先出，符合一层一层遍历的逻辑，而用栈先进后出适合模拟深度优先遍历也就是递归的逻辑。**而这种层序遍历方式就是图论中的广度优先遍历。

#### 3.1、逐层从左到右打印

**LC102**

```java
public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        Queue<TreeNode> queue = new LinkedList<>();
        if (root!=null) queue.offer(root);//初始化，加入根节点
        while (!queue.isEmpty()) {
            List<Integer> tmp = new ArrayList<>();
            //移除上一层个数的头部，就是上一层的节点
// for (int i = 0; i < queue.size(); i++) //不能这样写，因为queue.size实时更新，因该在赋初值之后不用影响到i的判定才好
            for (int i = queue.size(); i >0; i--) {
                TreeNode node = queue.poll();//获取并移除此队列的头，如果此队列为空，则返回 null。
                tmp.add(node.val);//add是加入尾部
                if (node.left!=null) queue.add(node.left);
                if (node.right!=null) queue.add(node.right);
            }
            res.add(tmp);
        }
        return res;
    }
```

#### 3.2、逐层从右到左打印

**LC107**  与从左到右打印的区别仅在与add换成了addFirst  这需要将ArrayList换成LinkedList

```java
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        Queue<TreeNode> queue = new LinkedList<>();
        List<List<Integer>> res = new ArrayList<>();
        if(root != null) queue.add(root);
        while(!queue.isEmpty()) {
            LinkedList<Integer> tmp = new LinkedList<>();//区别于上题，此处是LinkedList，才有addFirst的方法
            for(int i = queue.size(); i > 0; i--) {
                TreeNode node = queue.poll();//获取并移除此队列的头，如果此队列为空，则返回 null。
                tmp.addFirst(node.val); // 将指定元素插到头部 l<-r
                if(node.left != null) queue.add(node.left);
                if(node.right != null) queue.add(node.right);
            }
            res.add(tmp);
        }
        return res;
    }
}
```

#### 3.3、S形打印

**JZ32 III**

​	即第一行按照从左到右的顺序打印，第二层按照从右到左的顺序打印，第三行再按照从左到右的顺序打印，其他行以此类推。

```java
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        Queue<TreeNode> queue = new LinkedList<>();
        List<List<Integer>> res = new ArrayList<>();
        if(root != null) queue.add(root);
        while(!queue.isEmpty()) {
            LinkedList<Integer> tmp = new LinkedList<>();
            for(int i = queue.size(); i > 0; i--) {
                TreeNode node = queue.poll();//获取并移除此队列的头，如果此队列为空，则返回 null。
                if(res.size() % 2 == 0) tmp.addLast(node.val); // 将指定元素插到末尾 l->r
                else tmp.addFirst(node.val); // 将指定元素插到头部 l<-r
                if(node.left != null) queue.add(node.left);
                if(node.right != null) queue.add(node.right);
            }
            res.add(tmp);
        }
        return res;
    }
}
```

#### 3.4、二叉树的右视图

给定一棵二叉树，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。

```
输入: [1,2,3,null,5,null,null]	输出: [1, 3, 5]
   1            <---	1
 /   \
2     3         <---	3
 \     
  5             <---	5
```

思路：层序遍历，只存储当行最后一个值即可

```java
public List<Integer> rightSideView(TreeNode root) {
        Queue<TreeNode> queue = new LinkedList<>();
        if (root != null) { queue.offer(root); }
        List<Integer> res = new ArrayList<>();
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                if (i == size - 1) {res.add(node.val);}// 将每一层的最后元素放入result数组中
                if (node.left!=null) queue.add(node.left);
                if (node.right!=null) queue.add(node.right);
            }
        }
        return res;
    }
```

#### 3.5、N叉树的层序遍历

给定一个 N 叉树，返回其节点值的*层序遍历*。（即从左到右，逐层遍历）。树的序列化输入是用层序遍历，每组子节点都由 null 值分隔

<img src="https://assets.leetcode.com/uploads/2018/10/12/narytreeexample.png" alt="img" style="zoom: 33%;" />

```
输入：root = [1,null,3,2,4,null,5,6]
输出：[[1],[3,2,4],[5,6]]
```

代码:

```java
class Node {
    public int val;
    public List<Node> children;
    public Node() {}
    public Node(int _val) {
        val = _val;
    }
    public Node(int _val, List<Node> _children) {
        val = _val;
        children = _children;
    }
};
class Solution {
    public List<List<Integer>> levelOrder(Node root) {
        List<List<Integer>> res = new ArrayList<>();
        Queue<Node> queue = new LinkedList<>();
        if (root==null) return res;
        queue.offer(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            List<Integer> tmp = new ArrayList<>();
            for (int i = 0; i < size; i++) {
                Node node = queue.poll();
                tmp.add(node.val);
                queue.addAll(node.children);//addAll可以直接添加进去一个数组或者集合
            }
            res.add(tmp);
        }
        return res;
    }
}
```

#### 3.6、填充每个节点的下一个右侧节点

给定一个完美二叉树，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：

```
struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
```

填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。

初始状态下，所有 next 指针都被设置为 NULL。

<img src="https://camo.githubusercontent.com/742676402976a2f151251b7a8e1434cf9444e54faf40e15d4a439df789a3a2d4/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f32303231303230333135323034343835352e6a7067" alt="116.填充每个节点的下一个右侧节点指针" style="zoom:50%;" />

思路：层序遍历即可

```java
public class LC116 {
    public Node connect(Node root) {
        Queue<Node> queue = new LinkedList<>();
        if (root == null) {return root;}
        queue.add(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            //构建前后指针
            Node pre = null;
            Node cur;
            for (int i = 0; i < size; i++) {
                if (i == 0) {
                    pre = queue.poll();
                    cur = pre;
                } else {
                    cur = queue.poll();
                    pre.next = cur;
                    pre = pre.next;
                }
                if (cur.left!=null) queue.add(cur.left);
                if (cur.right!=null) queue.add(cur.right);
            }
            pre.next = null;
        }
        return root;
    }
    
    class Node {
        public int val;
        public Node left;
        public Node right;
        public Node next;
        public Node() {}
        public Node(int _val) {
            val = _val;
        }
        public Node(int _val, BinaryTree.Node _left, BinaryTree.Node _right, BinaryTree.Node _next) {
            val = _val;
            left = _left;
            right = _right;
            next = _next;
        }
    };
}
```

#### **LC相关题目**

- 102.二叉树的层序遍历、107.二叉树的层次遍历II
- 199.二叉树的右视图
- 637.二叉树的层平均值
- 429.N叉树的前序遍历
- 515.在每个树行中找最大值
- 116.填充每个节点的下一个右侧节点指针、117.填充每个节点的下一个右侧节点指针II

### 4、翻转转二叉树

简单dfs递归即可，也可以通过bfs实现

    输入：
        4
       /   \
      2     7
     / \   / \
    1   3 6   9
    输出：
    	 4
       /   \
      7     2
     / \   / \
    9   6 3   1
```java
public TreeNode invertTree(TreeNode root) {
        if (root == null) { return null; }
        TreeNode tmp = new TreeNode();
        tmp = root.left;
        root.left = root.right;
        root.right = tmp;
        invertTree(root.left);
        invertTree(root.right);
        return root;
    }
```

### 5、随机树的搜索

文件位置  BinaryTree\How2FindinBTree.java

```
      3
    /    \
   5      4
  / \    /  \ 
 1   2  7    9
         \    \   
         11    6
```

#### 5.1 	节点是否在树中

```java
 //二叉树中查找一个节点，判断是否在树中 true/false
    public boolean ifInThisTree(TreeNode root, int target) {
        if (root == null) return false;
        if (root.val == target) return true;
        return ifInThisTree(root.left, target)||ifInThisTree(root.right, target);
    }
```

#### 5.2	根到节点的路径

```java
LinkedList<Integer> path = new LinkedList<>();
boolean haspath = test.thePath2Node(root,6,path);
System.out.println(haspath);
if(haspath) System.out.println(path.toString()); 
//查找一个节点并给出路径 path 回溯法
    public boolean thePath2Node(TreeNode root, int target, LinkedList<Integer> path) {
        if (root == null) return false;
        path.add(root.val);
        //终止条件
        if (root.val == target) return true;
        //回溯
        boolean mark = false;
        if (root.left != null) {
            mark = thePath2Node(root.left, target, path);
        }
        if (!mark && root.right != null) {
            mark = thePath2Node(root.right, target, path);
        }
        //撤回
        if (!mark) path.removeLast();
        return mark;
    }
```

#### 5.3	节点的深度

```java
public int NodeDepth(TreeNode root, int target) {
        if (root == null) return -1;
        int depth = 0;
        if (root.val==target) return depth;
        depth = NodeDepth(root.left, target);
        if (depth == -1) { depth = NodeDepth(root.right, target); }
        return (depth != -1) ? depth + 1 : -1;
    }
```



## 二、属性

### 1、对称二叉树

**LC101**

例如，二叉树 `[1,2,2,3,4,4,3]` 是对称的。

```
    1
   / \
  2   2
 / \ / \
3  4 4  3
```

思路：可以中序遍历得一个数组再判断数组是否对称，但是复杂度就高了。所以可以用两种遍历方式来比较，对左子树进行左中右，对右子树进行右中左的遍历，然后而这对比即可。

根据以上思路是先迭代法：

```java
public boolean isSymmetric1(TreeNode root) {
    Deque<TreeNode> deque = new LinkedList<>();
    //初始化，先赋值入队
    deque.offerFirst(root.left);
    deque.offerLast(root.right);
    while (!deque.isEmpty()) {
        TreeNode lnode = deque.pollFirst();
        TreeNode rnode = deque.pollLast();
        if (lnode == null && rnode == null) { continue; }
        if (lnode == null || rnode == null || lnode.val != rnode.val) { return false; }
        deque.offerFirst(lnode.left);
        deque.offerFirst(lnode.right);
        deque.offerLast(rnode.right);
        deque.offerLast(rnode.left);
    }
    return true;
}
```

递归比较就是选取左子树的左对应右子树的右，左子树的右对应右子树的左。

```java
public boolean isSymmetric(TreeNode root) {
    if (root==null) return true;
    return compareLR(root.left, root.right);
}

private boolean compareLR(TreeNode left, TreeNode right) {
    if (left==null&&right!=null) return false;
    else if (right==null&&left!=null) return false;
    else if (right==null&&left==null) return true;
    else if (left.val != right.val) return false;
    //余下就是左右节点的值相等了 那就进入下一层递归
    return compareLR(left.left, right.right) && compareLR(right.left, left.right);
}
```

### 2、最大深度

**DFS遍历查找**

当前节点最大深度 = max ( 左子树最大深度 , 右子树最大深度 ) + 1

```java
public int maxDepth(TreeNode root) {
    if (root==null) return 0;
    return  1 + Math.max(maxDepth(root.right), maxDepth(root.left));
}
```

**BFS迭代查找**

```java
 //迭代法，使用层序遍历  算层数
    public int maxDepth(TreeNode root) {
        if(root == null) { return 0;}
        Deque<TreeNode> deque = new LinkedList<>();
        deque.offer(root);
        int depth = 0;
        while (!deque.isEmpty()) {
            int size = deque.size();
            depth++;
            for (int i = 0; i < size; i++) {
                TreeNode poll = deque.poll();
                if (poll.left != null) {deque.offer(poll.left);}
                if (poll.right != null) { deque.offer(poll.right);}
            }
        }
        return depth;
    }
}
```

### 3、最小深度

给定一个二叉树，找出其最小深度。**最小深度是从根节点到最近叶子节点的最短路径上的节点数量**。叶子节点是指没有子节点的节点。

给定二叉树 [3,9,20,null,null,15,7]

<img src="https://assets.leetcode.com/uploads/2020/10/12/ex_depth.jpg" alt="img" style="zoom:50%;" />

```
输入：root = [3,9,20,null,null,15,7]
输出：2
```

**代码：**

```java
public int minDepth(TreeNode root) {
    if ( root==null ) return 0;
    if ( root.left==null  ) return 1 + minDepth(root.right);
    if ( root.right==null ) return 1 + minDepth(root.left);
    return 1 + Math.min(minDepth(root.right), minDepth(root.left));
}
```

### 4、节点个数

**LC222**

普通二叉树，递归累加即可

```java
class Solution {
    // 通用递归解法
    public int countNodes(TreeNode root) {
        if(root == null) {
            return 0;
        }
        return countNodes(root.left) + countNodes(root.right) + 1;
    }
}
```

针对完全二叉树

完全二叉树只有两种情况，情况一：就是满二叉树，情况二：最后一层叶子节点没有满。

- 情况一，可以直接用 2^树深度 - 1 来计算，注意这里根节点深度为1。
- 情况二，分别递归左孩子，和右孩子，递归到某一深度一定会有左孩子或者右孩子为满二叉树，然后依然可以按照情况1来计算。

<img src="https://camo.githubusercontent.com/5d85c9f8df419ce8db22f668ff22f7a3ae55660b8e9bead3b98e2d8cdd69ac9c/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f32303230313132343039323534333636322e706e67" alt="222.完全二叉树的节点个数" style="zoom:40%;" />

```java
class Solution {
    /* 针对完全二叉树的解法：满二叉树的结点数为：2^depth - 1*/
    public int countNodes(TreeNode root) {
        if(root == null) { return 0;}
        int leftDepth = getDepth(root.left);
        int rightDepth = getDepth(root.right);
        if (leftDepth == rightDepth) {// 左子树是满二叉树
            // 2^leftDepth其实是 （2^leftDepth - 1） + 1 ，左子树 + 根结点
            return (1 << leftDepth) + countNodes(root.right);
        } else {// 右子树是满二叉树
            return (1 << rightDepth) + countNodes(root.left);
        }
    }

    private int getDepth(TreeNode root) {
        int depth = 0;
        while (root != null) {
            root = root.left;
            depth++;
        }
        return depth;
    }
}
```

### 5、平衡二叉树

**LC110**

给定一个二叉树，判断它是否是高度平衡的二叉树

```java
class Solution {
    public boolean isBalanced(TreeNode root) {
        if (root==null) return true;
        return Math.abs(deep(root.left) - deep(root.right)) < 2 && isBalanced(root.left) && isBalanced(root.right);
    }
    
    private int deep(TreeNode root) {
        //返回当前节点的最大深度
        if (root==null) return 0;
        return 1 + Math.max(deep(root.left), deep(root.right));
    }
}
```

### 6、所有路径

给定一个二叉树，返回所有从根节点到叶子节点的路径。说明: 叶子节点是指没有子节点的节点。

```
输入:
   1
 /   \
2     3
 \
  5
输出: ["1->2->5", "1->3"]
解释: 所有根节点到叶子节点的路径为: 1->2->5, 1->3
```

```java
class Solution {
    public List<String> binaryTreePaths(TreeNode root) {
        List<String> res = new ArrayList<>();
        StringBuilder path = new StringBuilder();
        findPath(root, path.toString(), res);
        return res;
    }
    private void findPath(TreeNode root,String path,List<String> res) {
        if (root != null) {
            StringBuilder tmp = new StringBuilder(path);
            tmp.append(Integer.toString(root.val));
            if (root.left == null && root.right == null) {
                res.add(tmp.toString());
            } else {
                tmp.append("->");//若不是终点，则加上->
                findPath(root.left, tmp.toString(), res);
                findPath(root.right, tmp.toString(), res);
            }
        }
    }
}
```



## 三、修改与构造

### 1、找树的左下角值

**LC513**	层序遍历实现，记录每层第一个值即可

### 2、左叶子之和

**LC404**	递归实现dfs

### 3、路径总和

**LC112	路径总和I** 
给你二叉树的根节点 root 和一个表示目标和的整数 targetSum ，判断该树中是否存在 根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和 targetSum 。

```java
public boolean hasPathSum(TreeNode root, int targetSum) {
        if (root==null) return false;
        targetSum -= root.val;
        //叶子节点
        //走到叶子节点时候若target更新为0 说明找到了
        if (root.left == null && root.right == null) {
            return targetSum == 0;
        }
        if (root.left != null) {
            boolean left = hasPathSum(root.left, targetSum);
            if (left) return true;
        }
        if (root.right != null) {
            boolean right = hasPathSum(root.right, targetSum);
            if (right) return true;
        }
        return false;
    }	
```

**LC113	路径总和II**

给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。

```java
package BinaryTree;
import java.util.ArrayList;
import java.util.List;
//路径总和II
public class LC113 {
    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {
        List<List<Integer>> res = new ArrayList<>();
        List<Integer> path = new ArrayList<>();
        findPath(root, targetSum, path, res);
        return res;
    }
    private void findPath(TreeNode root,int targetSum,List<Integer> path,List<List<Integer>> res) {
        if (root != null) {
            List<Integer> tmp = new ArrayList<>(path);
            targetSum -= root.val;
            tmp.add(root.val);
            if (root.left == null && root.right == null && targetSum == 0) {
                res.add(tmp);
            } else {
                findPath(root.left, targetSum, tmp, res);
                findPath(root.right, targetSum, tmp, res);
            }
        }
    }
}
```

**LC437	路径总和III**

暴力递归（双重递归）

```java
public class LC437 {
    int count;
    public int pathSum(TreeNode root, int targetSum) {
        if (root == null) { return 0; }
        dfs(root, targetSum);
        pathSum(root.left, targetSum);
        pathSum(root.right, targetSum);
        return count;
    }
    private void dfs(TreeNode root, int sum) {
        if (root == null) { return;  }
        sum -= root.val;
        if (sum == 0) {  count++; }
        dfs(root.left, sum);
        dfs(root.right, sum);
    }
}
```

**前缀和+回溯**

写法一

```java
//路径总和iii  回溯+前缀和实现 **
public class LC437 {
    Map<Integer, Integer> prefixMap;
    int target;
    public int pathSum(TreeNode root, int targetSum) {
        prefixMap = new HashMap<>();
        target = targetSum;
        prefixMap.put(0, 1);
        return recur(root, 0);
    }
    private int recur(TreeNode node,int curSum) {
        if (node == null) { return 0; }
        int res = 0;
        curSum += node.val;

        res += prefixMap.getOrDefault(curSum - target, 0);
        prefixMap.put(curSum, prefixMap.getOrDefault(curSum, 0) + 1);

        int left = recur(node.left, curSum);
        int right = recur(node.right, curSum);

        res = res + left + right;
        prefixMap.put(curSum, prefixMap.get(curSum) - 1);
        return res;
    }
}
```

写法二

```java
class Solution {
    Map<Integer, Integer> prefixMap = new HashMap<>();//<前缀和，其出现次数>
    int res=0;
    public int pathSum(TreeNode root, int target) {
        prefixMap.put(0, 1);
        dfs(root, target, 0);
        return res;
    }
    private void dfs(TreeNode root, int target, int cursum) {
        if (root == null) { return; }
        cursum += root.val;//更新前缀和
        //当前路径中存在以当前节点为终点的和为sum的子路径
        res += prefixMap.getOrDefault(cursum - target, 0);
        prefixMap.put(cursum, prefixMap.getOrDefault(cursum, 0) + 1);
        dfs(root.left, target, cursum);
        dfs(root.right, target, cursum);
        prefixMap.put(cursum, prefixMap.get(cursum) - 1);
    }
}
```



### 4、构造二叉树⭐

根据序列构造二叉树：

#### 1、前序+中序

前序确定根节点，中序根据根节点位置确定左右子树的大小

```java
public class LC105 {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        return help(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1);
    }
    private TreeNode help(int[] preorder, int pl, int pr, int[] inorder, int il, int ir) {
        if (pl > pr || il > ir) return null;
        int i = il;
        while (inorder[i] != preorder[pl]) i++;//找到中序中的根节点  左子树有i-pl 个
        TreeNode root = new TreeNode(preorder[pl]);
        //左子树
        root.left = help(preorder, pl + 1, pl + i - il, inorder, il, i - 1);
        //右子树
        root.right = help(preorder, pl + i - il + 1, pr, inorder, i + 1, ir);
        return root;
    }
}
```

#### 2、后序+中序

```java
public class LC106 {
    public TreeNode buildTree(int[] inorder, int[] postorder) {
        return help(inorder, 0, inorder.length-1, postorder, 0, postorder.length-1);
    }
    private TreeNode help(int[] inorder, int l1, int r1, int[] postorder, int l2, int r2) {
        if (l1>r1||l2>r2) return null;
        int i = l1;
        //后序遍历序列的末尾，即为根节点
        while (inorder[i] != postorder[r2]) {
            i++;
        }
        TreeNode root = new TreeNode(postorder[r2]);
        root.left = help(inorder, l1, i - 1, postorder, l2, l2 + i - l1 - 1);
        root.right = help(inorder, i + 1, r1, postorder, l2 + i - l1, r2 - 1);
        return root;
    }
}
```

### 5、构造最大二叉树

**LC654**		给定一个不含重复元素的整数数组。一个以此数组构建的最大二叉树定义如下：

- 二叉树的根是数组中的最大元素。
- 左子树是通过数组中最大值左边部分构造出的最大二叉树。
- 右子树是通过数组中最大值右边部分构造出的最大二叉树。

思路：按照规律递归即可

```java
class Solution {
    public TreeNode constructMaximumBinaryTree(int[] nums) {
        return help(nums, 0, nums.length);
    }
    private TreeNode help(int[] nums, int l, int r) {
        if (r - l < 1) return null;
        if (r - l == 1) return new TreeNode(nums[l]); //终止条件
        int maxVal = 0;
        int maxValIndex = 0;
        //寻找最大值
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] >= maxVal) {
                maxVal = nums[i];
                maxValIndex = i;
            }
        }
        TreeNode root = new TreeNode(maxVal);
        root.left = help(nums, l, maxValIndex);
        root.right = help(nums, maxValIndex + 1, r);
        return root;
    }
}
```

### 6、合并两个二叉树

**LC617	**给定两个二叉树，想象当你将它们中的一个覆盖到另一个上时，两个二叉树的一些节点便会重叠。你需要将他们合并为一个新的二叉树。合并的规则是如果两个节点重叠，那么将他们的值相加作为节点合并后的新值，否则不为 NULL 的节点将直接作为新二叉树的节点。

```
示例 1:输入: 
	Tree 1                     Tree 2                  
          1                         2                             
         / \                       / \                            
        3   2                     1   3                        
       /                           \   \                      
      5                             4   7                  
输出: 合并后的树:
	     3
	    / \
	   4   5
	  / \   \ 
	 5   4   7

```

```java
public TreeNode mergeTrees(TreeNode root1, TreeNode root2) {
        if (root1==null) return root2;
        if (root2==null) return root1;

        TreeNode newTree = new TreeNode(root1.val + root2.val);
        newTree.left = mergeTrees(root1.left, root2.left);
        newTree.right = mergeTrees(root1.right, root2.right);
        return newTree;
}
//迭代法：
public TreeNode mergeTrees(TreeNode root1, TreeNode root2) {
        if (root1==null) return root2;
        if (root2==null) return root1;

        Stack<TreeNode> stack = new Stack<>();
        stack.push(root1);
        stack.push(root2);

        while (!stack.isEmpty()) {
            TreeNode node2 = stack.pop();
            TreeNode node1 = stack.pop();
            node1.val += node2.val;//把tree1当作主体
            if (node2.right != null && node1.right != null) {
                stack.push(node1.right);
                stack.push(node2.right);
            } else {
                if (node1.right==null) node1.right = node2.right;//左无右右，将右赋值给左
            }
            if (node1.left != null && node2.left != null) {
                stack.push(node1.left);
                stack.push(node2.left);
            } else {
                if (node1.left==null) node1.left = node2.left;
            } 
        }
        return root1;
    }

```



## 四、二叉树搜索树的属性

### 1、二叉搜索树中的搜索

**LC700**	给定二叉搜索树（BST）的根节点和一个值。 你需要在BST中找到节点值等于给定值的节点。 返回以该节点为根的子树。 如果节点不存在，则返回 NULL。

```java
//二叉搜索树
public class LC700 {
    public TreeNode searchBST(TreeNode root, int val) {
        if (root==null||root.val==val) return root;
        if (root.val>val) return searchBST(root.left, val);
        else return searchBST(root.right, val);
    }
    //层序搜索
    public TreeNode searchBST1(TreeNode root, int val) {
        if (root==null||root.val==val) return root;
        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            if (node.val == val) return node;
            if (node.val>val&&node.left!=null) stack.push(node.left);
            if (node.val<val&&node.right!=null) stack.push(node.right);
        }
        return null;
    }
	//迭代法	
    public TreeNode searchBST2(TreeNode root, int val) {
        while (root != null) {
            if (root.val==val) return root;
            else if (root.val>val){ root = root.left;}
            else{ root = root.right;}

        }
        return root;
    }
}

```

### 2、验证二叉搜索树

**LC98**  给定一个二叉树，判断其是否是一个有效的二叉搜索树。假设一个二叉搜索树具有如下特征：

- 节点的左子树只包含小于当前节点的数。

- 节点的右子树只包含大于当前节点的数。

- 所有左子树和右子树自身必须也是二叉搜索树。

```java
public boolean isValidBST(TreeNode root) {
        return help(Long.MIN_VALUE, Long.MAX_VALUE, root);
    }

    private boolean help(long lower, long upper, TreeNode root) {
        if (root==null) return true;
        if (root.val<=lower||root.val>=upper) return false;
        return help(lower, root.val, root.left) && help(root.val, upper, root.right);

    }
}
```

### 3、二叉搜索树的最小绝对差

**LC530**	给你一棵所有节点为非负值的二叉搜索树，请你计算树中任意两节点的差的绝对值的最小值。

中序遍历二叉搜索树得到的就是一个有序数组

```java
class Solution {
    TreeNode pre;int res = Integer.MAX_VALUE;
    public int getMinimumDifference(TreeNode root) {
        //先中序遍历就能在二叉搜索树中排出有序序列
        if (root == null) return res;
        //left
        int left = getMinimumDifference(root.left);
        if (pre!=null) res = Math.min(res, root.val - pre.val);
        pre = root;
        int right = getMinimumDifference(root.right);
        res = Math.min(res, right);
        return res;
    }
}
```

### 4、二叉搜索树中过的众数

**LC501**	给定一个有相同值的二叉搜索树（BST），找出 BST 中的所有众数（出现频率最高的元素）。

假定 BST 有如下定义：

结点左子树中所含结点的值小于等于当前结点的值
结点右子树中所含结点的值大于等于当前结点的值
左子树和右子树都是二叉搜索树

```java
class Solution {
    ArrayList<Integer> ans;  //结果集
    int maxCount;//最大计数
    int count;//当前元素计数
    TreeNode pre;//前一个节点

    public int[] findMode(TreeNode root) {
        //初始化
        ans = new ArrayList<>();
        maxCount = 0;
        count = 0;
        pre = null;

        help(root);
//        int[] res = new int[ans.size()];
//        for (int i = 0; i < ans.size(); i++) {
//            res[i] = ans.get(i);
//        }
//        return res;
        //数字列表转化为数组：等效于如下代码
        return ans.stream().mapToInt(Integer::intValue).toArray();
        
    }
    //基于中序遍历改造操作
    private void help(TreeNode root) {
        if (root==null) return;
        help(root.left);//
        int rootVal = root.val;
        //计数
        count = (pre == null || root.val != pre.val) ? 1 : count + 1;
        if (count > maxCount) {
            ans.clear();
            ans.add(rootVal);
            maxCount = count;
        } else if (count == maxCount) {
            ans.add(rootVal);
        }
        pre = root;
        help(root.right);//
    }
}
```







## 五、二叉树搜索树的修改与构造

### 1、二叉搜索树中的插入操作

给定二叉搜索树（BST）的根节点和要插入树中的值，将值插入二叉搜索树。 返回插入后二叉搜索树的根节点。 输入数据 保证 ，新值和原始二叉搜索树中的任意节点值都不同。注意，可能存在多种有效的插入方式，只要树在插入后仍保持为二叉搜索树即可。 你可以返回 任意有效的结果 。

其实**可以不考虑题目中提示所说的改变树的结构的插入方式**，只要按照二叉搜索树的规则去遍历，遇到空节点就插入节点就可以了。

```java
class Solution {
    public TreeNode insertIntoBST(TreeNode root, int val) {
        if (root==null) return new TreeNode(val);
        if (root.val>val) root.left = insertIntoBST(root.left, val);
        if (root.val<val) root.right = insertIntoBST(root.right, val);
        return root;
    }
}
```

迭代法：

```java
class Solution {
    public TreeNode insertIntoBST(TreeNode root, int val) {
        if (root == null) return new TreeNode(val);
        TreeNode newRoot = root;
        TreeNode pre = root;
        while (root != null) {
            pre = root;
            if (root.val > val) {
                root = root.left;
            } else if (root.val < val) {
                root = root.right;
            } 
        }
        if (pre.val > val) {
            pre.left = new TreeNode(val);
        } else {
            pre.right = new TreeNode(val);
        }
        return newRoot;
    }
}
```

### 2、删除二叉搜索树中的节点

**LC450**	给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的 key 对应的节点，并保证二叉搜索树的性质不变。返回二叉搜索树（有可能被更新）的根节点的引用。一般来说，删除节点可分为两个步骤：

- 首先找到需要删除的节点；
- 如果找到了，删除它。

如果被删除点左右子树都存在：

1. 选取该节点中左子树最大值继承该节点，随后删除左子树中对应节点
2. 选取该节点中右子树最小值继承该节点，随后删除右子树中对应节点⭐
3. 右子树直接取代该节点，将左子树接到原右子树最小元素上⭐
4. 左子树直接取代该节点，将右子树接到原右子树最大元素上

```java
class Solution {
    public TreeNode deleteNode(TreeNode root, int key) {
        if (root==null) return root;
        if (root.val == key) {
            //无子节点，直接删除，返回null
            if (root.left == null && root.right == null) return null;
            //有一个子节点为空,返回存在的子树作为当前节点
            if (root.left==null) return root.right;
            if (root.right==null) return root.left;
            
            //剩下的情况是拥有两个子节点，删除该节点后，右子树作为当前节点，左子树移接到大于该节点的最小的节点上
            TreeNode node = root.right;//指针指向root.right 改变node就是改变对应节点
            while (node.left != null) { node = node.left; } //该操作一直向右子树的左子树递归找到最左节点，就是我们目标嫁接的节点
//            node.left = root.left;
//            return root.right;

            //另一种想法就是，将此节点值更新为大于该节点值的最小值,并在右子树中删去该值
            root.val = node.val;
            root.right = deleteNode(root.right, node.val);

        } else if (root.val > key) {
            root.left = deleteNode(root.left, key);
        } else {
            root.right = deleteNode(root.right, key);
        }
        return root;
    }
}
```

### 3、修剪一棵二叉搜索树

**LC669**	 修剪二叉搜索树

给你二叉搜索树的根节点 `root` ，同时给定最小边界`low` 和最大边界 `high`。通过修剪二叉搜索树，使得所有节点的值在`[low, high]`中。修剪树不应该改变保留在树中的元素的相对结构（即，如果没有被移除，原有的父代子代关系都应当保留）。 可以证明，存在唯一的答案。

<img src="https://assets.leetcode.com/uploads/2020/09/09/trim2.jpg" alt="img" style="zoom: 50%;" />

```
输入：root = [3,0,4,null,2,null,null,1], low = 1, high = 3
输出：[3,2,null,1]
```

思路：

1. 遇到node小于low节点：该点更新为node.right进行调整
2. 遇到node大于high节点：该店更新为node.left进行调整
3. node在[low,high]区间，对左右子树都进行如上遍历在返回root

```java
class Solution {
    public TreeNode trimBST(TreeNode root, int low, int high) {
        if (root==null) return null;
        //根节点比low小，则只对右子树调整
        if (root.val < low ) return trimBST(root.right, low, high);
        //根节点比high大，支队左子树调整
        if (root.val > high) return trimBST(root.left, low, high);
        //要遍历整棵树
        root.left = trimBST(root.left, low, high);
        root.right = trimBST(root.right, low, high);
        return root;
    }
}
```

### 4、构造一棵搜索树

**LC108**：**将有序数组转换为二叉搜索树**

给你一个整数数组 `nums` ，其中元素已经按 **升序** 排列，请你将其转换为一棵 **高度平衡** 二叉搜索树。**高度平衡** 二叉树是一棵满足「每个节点的左右两个子树的高度差的绝对值不超过 1 」的二叉树。

递归：

```java
class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        return help(nums, 0, nums.length - 1);
    }
    private TreeNode help(int[] nums, int l, int r) {
        if (l > r) return null;
        TreeNode root = new TreeNode();
        int mid = l + (r - l + 1) / 2;
        root.val = nums[mid];
        root.left = help(nums, l, mid - 1);
        root.right = help(nums, mid + 1, r);
        return root;
    }
}
```

迭代：

```java
class Solution {
	public TreeNode sortedArrayToBST(int[] nums) {
		if (nums.length == 0) return null;
		//根节点初始化
		TreeNode root = new TreeNode(-1);
		Queue<TreeNode> nodeQueue = new LinkedList<>();
		Queue<Integer> leftQueue = new LinkedList<>();
		Queue<Integer> rightQueue = new LinkedList<>();
		// 根节点入队列
		nodeQueue.offer(root);
		// 0为左区间下表初始位置
		leftQueue.offer(0);
		// nums.size() - 1为右区间下表初始位置
		rightQueue.offer(nums.length - 1);

		while (!nodeQueue.isEmpty()) {
			TreeNode currNode = nodeQueue.poll();
			int left = leftQueue.poll();
			int right = rightQueue.poll();
			int mid = left + ((right - left) >> 1);
			// 将mid对应的元素给中间节点
			currNode.val = nums[mid];
			// 处理左区间
			if (left <= mid - 1) {
				currNode.left = new TreeNode(-1);
				nodeQueue.offer(currNode.left);
				leftQueue.offer(left);
				rightQueue.offer(mid - 1);
			}
			// 处理右区间
			if (right >= mid + 1) {
				currNode.right = new TreeNode(-1);
				nodeQueue.offer(currNode.right);
				leftQueue.offer(mid + 1);
				rightQueue.offer(right);
			}
		}
		return root;
	}
}
```

### 5、搜索树转累加树

给出二叉 搜索 树的根节点，该树的节点值各不相同，请你将其转换为累加树（Greater Sum Tree），使每个节点 node 的新值等于原树中大于或等于 node.val 的值之和。

其实就是右中左的反向中序遍历形式

```java
class Solution {
    int res;
    public TreeNode convertBST(TreeNode root) {
        if (root==null) return null;
        convertBST(root.right);
        res += root.val;
        root.val = res;
        convertBST(root.left);
        return root;
    }
}
```



## 六、公共祖先

### 1、二叉树的最近公共祖先

**LC236**	给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

<img src="https://assets.leetcode.com/uploads/2018/12/14/binarytree.png" alt="img"  />

```
输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
输出：3
解释：节点 5 和节点 1 的最近公共祖先是节点 3 。
```



```java
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        //进入到root不等于p、q
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);

        if (left==null) return right;
        if (right==null) return left;
        return root;
    }
}
```

### 2、二叉搜索树的最近公共祖先

```java
public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        while (true) {
            if (root.val > p.val && root.val > q.val) root = root.left;
            else if (root.val < p.val && root.val < q.val) root = root.right;
            else break;
        }
        return root;
    }
```



## 七、字典树构造⭐

LC208





# 双指针法

LC15、18、19、27、344、151、142

## 三数之和  LC15

```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(nums);
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] > 0) {
                return result;
            }
            if (i > 0 && nums[i] == nums[i - 1]) {
                continue;
            }
            int left = i + 1;
            int right = nums.length - 1;
            while (right > left) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum > 0) {
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    while (right > left && nums[right] == nums[right - 1]) right--;
                    while (right > left && nums[left] == nums[left + 1]) left++;    
                    right--; 
                    left++;
                }
            }
        }
        return result;
    }
}
```

## 四数之和 LC18

```java
class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(nums);
       
        for (int i = 0; i < nums.length; i++) {

            if (i > 0 && nums[i - 1] == nums[i]) {
                continue;
            }
            
            for (int j = i + 1; j < nums.length; j++) {

                if (j > i + 1 && nums[j - 1] == nums[j]) {
                    continue;
                }

                int left = j + 1;
                int right = nums.length - 1;
                while (right > left) {
                    int sum = nums[i] + nums[j] + nums[left] + nums[right];
                    if (sum > target) {
                        right--;
                    } else if (sum < target) {
                        left++;
                    } else {
                        result.add(Arrays.asList(nums[i], nums[j], nums[left], nums[right]));
                        
                        while (right > left && nums[right] == nums[right - 1]) right--;
                        while (right > left && nums[left] == nums[left + 1]) left++;

                        left++;
                        right--;
                    }
                }
            }
        }
        return result;
    }
}

```

# 回溯 ⭐

## 总结

​		不要过分去想每一层下去之后又是怎么去做每一步的，从一开始，回溯就是多层for循环的一种优化结构，被指上就是遍历，但是遍历层数是会根据条件改变的，所以需要递归来完成向下遍历，将问题的递归想象成树形结构，可以方便自己使用模板。

回溯法，一般可以解决如下几种问题：

- 组合问题：N个数里面按一定规则找出k个数的集合
- 切割问题：一个字符串按一定规则有几种切割方式
- 子集问题：一个N个数的集合里有多少符合条件的子集
- 排列问题：N个数按一定规则全排列，有几种排列方式
- 棋盘问题：N皇后，解数独等等

## 模板

**主体为两部分**

### 1、主函数

主函数根据需求我们需要确定返回值以及对应问题的递归迭代是否需要参数返回

### 2、回溯函数 backtrack

backtrack的输入常见的有一个索引值：startIndex 通常表示此次循环开始的位置，这是用于更新起点，进行递归。
该函数主要包含两块

- **判定终止：**判定遍历走到了叶子节点或者达到了写入结果集当中的要求
- **进行回溯：**

```java
private void backTrack(......){
    //判定终止
    if (终止条件) {
    存放结果;
    return;
	}
    //进行回溯
    for (选择：本层集合中元素（树中节点孩子的数量就是集合的大小）) {
        处理节点;
        backtracking(路径，选择列表); // 递归
        回溯，撤销处理结果
    }
}
```

## 组合问题  

### 组合	LC77

```java
//组合:给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
public class LC77 {
    List<List<Integer>> res = new ArrayList<>();
    LinkedList<Integer> path = new LinkedList<>();
    public List<List<Integer>> combine(int n, int k) {
        backTrack(n, k, 1);
        return res;
    }

    private void backTrack(int n, int k, int startIndex) {
        if (path.size() == k) {
            res.add(new ArrayList<>(path));
            return;
        }
        for (int i = startIndex; i <= n - (k - path.size()) + 1; i++) {
            //i <= n - (k - path.size()) + 1 剪枝操作，因为我们是顺序取k个数，那么第一层就顺序取前面n-k个数遍历即可，但是就算n=k也要取一个 所以加一
            path.add(i);
            backTrack(n, k, i + 1);//递归
            path.removeLast();//之前函数中已提交，撤回一步
        }
    }
}
```



### 组合总和	

### LC39(无限选取)

```java
//组合总和  元素可重复选取
public class LC39 {
    List<List<Integer>> res = new ArrayList<>();
    LinkedList<Integer> path = new LinkedList<>();
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        int sum = 0;
        Arrays.sort(candidates);
        backTrack(candidates, target, sum, 0);
        return res;
    }
    private void backTrack(int[] candidates, int target, int sum, int startIndex) {
        if (sum == target) {
            res.add(new ArrayList<>(path));
            return;
        }
        //小于就继续 进入单层逻辑
        for (int i = startIndex; i < candidates.length && sum + candidates[i] <= target; i++) {
            sum += candidates[i];
            path.add(candidates[i]);
            backTrack(candidates, target, sum, i);//可重复读取当前数，只有进入下一次循环才重新从下一个位置开始重读
            sum -= candidates[i];
            path.removeLast();
        }
    }
}
```

### LC40

```java
//组合总和 II:给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。candidates 中的每个数字在每个组合中只能使用一次
public class LC40 {
    List<List<Integer>> res = new ArrayList<>();
    LinkedList<Integer> path = new LinkedList<>();
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        boolean[] flag = new boolean[candidates.length];
        Arrays.sort(candidates);
        backTrack(candidates, target, 0, 0, flag);
        return res;
    }

    private void backTrack(int[] candidates, int target, int sum, int startIndex,boolean[] flag) {
        if (sum == target) {
            res.add(new ArrayList<>(path));
            return;
        }

        for (int i = startIndex; i < candidates.length && sum + candidates[i] <= target; i++) {
            //去重操作
            //出现重复节点，同层的第一个节点已经被访问过，所以直接跳过
            if (i > 0 && candidates[i] == candidates[i - 1] && !flag[i - 1]) {
                continue;
            }
            flag[i] = true;

            sum += candidates[i];
            path.add(candidates[i]);
            backTrack(candidates, target, sum, i + 1,flag);
            sum -= candidates[i];
            flag[i] = false;
            path.removeLast();

        }
    }
}

```



## 分割问题

### 分割回文串	LC131

```java
//分割回文串  给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案。
//回文串 是正着读和反着读都一样的字符串。
public class LC131 {
    List<List<String>> res = new ArrayList<>();
    LinkedList<String> path = new LinkedList<>();
    public List<List<String>> partition(String s) {
        backTrack(s, 0);
        return res;
    }

    private void backTrack(String a, int startIndex) {
        if (startIndex >= a.length()) {
            res.add(new ArrayList<>(path));
            return;
        }

        for (int i = startIndex; i < a.length(); i++) {
            if (isPalindrome(a, startIndex, i)) {
                String load = a.substring(startIndex, i + 1);
                path.add(load);
            } else {
                continue;
            }
            backTrack(a, i + 1);
            path.removeLast();
        }
    }

    private boolean isPalindrome(String s, int begin, int end) {
        /*for (int i = begin, j = end; i < j; i++, j--) {
            if (s.charAt(i) != s.charAt(j)) {
                return false;
            }
        }*/
        while (begin < end) {
            if (s.charAt(begin) != s.charAt(end)) {
                return false;
            }
            begin++;
            end--;
        }
        return true;
    }

}
```

### 复原IP地址

```java
//复原 IP 地址   给定一个只包含数字的字符串，用以表示一个 IP 地址，返回所有可能从 s 获得的 有效 IP 地址 。你可以按任何顺序返回答案
public class LC93 {
    List<String> res = new ArrayList<>();
    public List<String> restoreIpAddresses(String s) {
        if (s.length() > 12) { return res; }
        int pointNums = 0;
        backTrack(s, 0, 0);
        return res;
    }

    private void backTrack(String s,int startIndex, int pointNums) {
        if (pointNums == 3) {
            //判断s的最后一段是否合法
            if (isOK(s, startIndex, s.length() - 1)) { res.add(s); }
            return;
        }
        //单层逻辑判断
        for (int i = startIndex; i < s.length(); i++) {
            if (isOK(s, startIndex, i)) {
                s = s.substring(0, i + 1) + '.' + s.substring(i + 1);
                pointNums++;
                backTrack(s, i + 2, pointNums);
                pointNums--;
                s = s.substring(0, i + 1) + s.substring(i + 2);
            } else {
                break;
            }
        }


    }

    private boolean isOK(String s, int head, int tail) {
        //判断字符串分段是否符合插入规则
        if (head > tail || tail - head >= 3) { return false; }
        if (s.charAt(head) == '0' && head != tail) { return false; }
        int num = 0;
        for (int i = head; i <= tail; i++) {
            if (s.charAt(i) > '9' && s.charAt(i) < '0') { return false; }
            num = num * 10 + (s.charAt(i) - '0');
            if (num > 255) { return false; }
        }
        return true;
    }
}
```

## 子集问题

### 求子集

LC78

```java
//子集I
public class LC78 {
    List<List<Integer>> ans = new ArrayList<>();
    LinkedList<Integer> path = new LinkedList<>();

    public List<List<Integer>> subsets(int[] nums) {
        if (nums.length == 0) return ans;
        backTrack(nums, 0);
        return ans;
    }

    private void backTrack(int[] nums, int startIndex) {
        ans.add(new ArrayList<>(path));//每一步都先添加
        if (startIndex >= nums.length) {
            return;
        }
        for (int i = startIndex; i < nums.length; i++) {
            path.add(nums[i]);
            backTrack(nums, i + 1);
            path.removeLast();
        }
    }
}
```

LC90

```java
//子集II  有重复元素，但要求子集不可重复
public class LC90 {
    List<List<Integer>> ans = new ArrayList<>();
    LinkedList<Integer> path = new LinkedList<>();
    Set<List<Integer>> set = new HashSet<>();
    public List<List<Integer>> subsetsWithDup(int[] nums) {
        Arrays.sort(nums);
        if (nums.length == 0) { return ans; }
        backTrack(nums, 0);
        Iterator iterator = set.iterator();
        while (iterator.hasNext()) {
            ans.add((List<Integer>) iterator.next());
        }
        return ans;
    }
    private void backTrack(int[] nums, int startIndex) {
        List<Integer> tmp = new ArrayList<>(path);
        set.add(tmp);
        if (startIndex >= nums.length) {
            return;
        }
        for (int i = startIndex; i < nums.length; i++) {
            path.add(nums[i]);
            backTrack(nums, i + 1);
            path.removeLast();
        }
    }
}
```



### 递增子序列  	

LC491

```java
//递增子序列
public class LC491 {
    List<List<Integer>> ans = new ArrayList<>();
    LinkedList<Integer> path = new LinkedList<>();
    public List<List<Integer>> findSubsequences(int[] nums) {
        if (nums.length == 0) { return ans; }
        backTrack(nums, 0);
        return ans;
    }

    private void backTrack(int[] nums, int starIndex) {
        //终止条件
        if (path.size() > 1) { ans.add(new ArrayList<>(path)); }

        //本层去重，采用set去重
//        Set<Integer> set = new HashSet<>();
        int[] used = new int[201];
        for (int i = starIndex; i < nums.length; i++) {
            //跳过重复或者比前一项元素小的条件
//            if (set.contains(nums[i]) || !path.isEmpty() && nums[i] < path.getLast()) {
//                continue;
//            }
            if (used[nums[i]+100]==1 || !path.isEmpty() && nums[i] < path.getLast()) {
                continue;
            }
            used[nums[i] + 100] = 1;
//            set.add(nums[i]);//作为记录，不弹出
            path.add(nums[i]);
            backTrack(nums, i + 1);
            path.removeLast();
        }
    }
}
```

### 均分子集

给定一个整数数组，以及一个整数k，问是否存在可以将该整数数组划分为k个非空子集，使得所有的非空子集的内部和都是相同的。

```java
import java.util.Arrays;
public class TP_2 {
    public boolean canPartitionKSubsets(int[] nums, int k) {
        //边界条件
        if (nums.length < k) { return false; }
        int sum = 0;
        Arrays.sort(nums);
        for (int n : nums) { sum += n; }
        int target = sum / k;
        if (sum % k != 0 || nums[nums.length - 1] > target) { return false; }
        //回溯
        boolean[] used = new boolean[nums.length];
        return backTrack(nums, 0, target, k, used, 0);
    }
    private boolean backTrack(int[] nums, int end, int target, int k, boolean[] used,int add) {
        if (k == 1) { return true; }
        if (add == target) {
            return backTrack(nums, nums.length - 1, target, k - 1, used, 0);
        }
        for (int i = end; i >= 0; i--) {
            if (used[i]) { continue; }
            if (add + nums[i] > target) { continue; }
            used[i] = true;
            if (backTrack(nums, i - 1, target, k , used, add + nums[i])) {
                return true;
            }
            used[i] = false;
            while (i > 0 && nums[i - 1] == nums[i]) {
                i--;//剪枝
            }
        }
        return false;
    }
}
```



## 排列问题

### 全排列  

LC46	给定一个没有重复数字的序列，返回其所有可能的全排列。
示例: 输入: [1,2,3] 输出: [ [1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1] ]

```java
//全排列
public class LC46 {
    List<List<Integer>> ans = new ArrayList<>();
    LinkedList<Integer> path = new LinkedList<>();
    Set<Integer> set = new HashSet<>();
    public List<List<Integer>> permute(int[] nums) {
        if (nums.length == 0) {
            return ans;
        }
        backTrack(nums);
        return ans;
    }

    private void backTrack(int[] nums) {
        if (path.size() == nums.length) {
            ans.add(new ArrayList<>(path));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (set.contains(nums[i])) { continue; }
            set.add(nums[i]);
            path.add(nums[i]);
            backTrack(nums);
            path.removeLast();
            set.remove(nums[i]);
        }
    }

}
```



LC47	给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
示例 1： 输入：nums = [1,1,2] 输出： [[1,1,2], [1,2,1], [2,1,1]]
示例 2： 输入：nums = [1,2,3] 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

```java
public class LC47_better {
    List<List<Integer>> ans = new ArrayList<>();
    LinkedList<Integer> path = new LinkedList<>();
    public List<List<Integer>> permuteUnique(int[] nums) {
        if (nums.length == 0) { return ans; }
        Arrays.sort(nums);
        int[] used = new int[nums.length];
        backTrack(nums,used);
        return ans;
    }

    private void backTrack(int[] nums, int[] used) {
        if (path.size() == nums.length) {
            ans.add(new ArrayList<>(path));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            //跳过条件
            if (i > 0 && nums[i] == nums[i - 1] && used[i - 1] == 0) {
                //tips: used[i-1]==0和1都可，但是 0 效率更高，因为后面再重复的就不会进入递归
                continue;
            }
            if (used[i] == 0) {
                //该节点还未使用过
                used[i] = 1;//此时使用标记为 1
                path.add(nums[i]);
                backTrack(nums, used);
                path.removeLast();
                used[i] = 0;
            }
        }
    }
}
```

## N皇后问题

```java
public class N_Queens {
    List<List<String>> ans = new ArrayList<>();
    public List<List<String>> solveNQueens(int n) {
        char[][] chessboard = new char[n][n];
        for (char[] c : chessboard) { Arrays.fill(c, '.'); }
        backTrack(n, 0, chessboard);
        return ans;
    }

    private void backTrack(int n, int row,char[][] chessboard) {
        //棋盘大小 n×n
        //第几行 row
        //棋盘  chessboard
        //chessboard是每种棋盘图的解法，也是n×n
        if (row == n) {
            ans.add(Array2List(chessboard));
            return;
        }

        for (int col = 0; col < n; col++) {
            //col 为列数 按列遍历
            if (isOk(n, row, col, chessboard)) {
                chessboard[row][col] = 'Q';
                backTrack(n, row + 1, chessboard);
                chessboard[row][col] = '.';
            }
        }
    }

    private List<String> Array2List(char[][] chessboard) {
        //将棋盘形式转化为list
        List<String> list = new ArrayList<>();
        for (char[] c : chessboard) {
            list.add(String.valueOf(c));
        }
        return list;
    }

    private boolean isOk(int n, int row, int col, char[][] chessboard) {
        //判断在[row,col]插入Q
        int count = 0;
        //检查行列，因为是按照每行来加入一个Q  所以不存在一行出现俩Q 所以行列检查只检查列即可
        for (int i = 0; i < row; i++) { if (chessboard[i][col] == 'Q') { return false; } }
        //135°角度查找  即对角线，判断之前的位置安排与现在这个位置插入会不会有影响
        for (int i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) { if (chessboard[i][j] == 'Q') { return false; }}
        //45°角度查找  即对角线，判断之前的位置安排与现在这个位置插入会不会有影响
        for (int i = row - 1, j = col -1; i >= 0 && j >= 0; i--, j--) { if (chessboard[i][j] == 'Q') { return false; }}
        //都不冲突则此位置下棋可行
        return true;
    }
}
```



## 数独问题

```java
//数独
//规则1~9 每一行每一列只能出现一次,每3×3的格子中也只出现一次且必须出现一次。
// 输入 一个9×9矩阵，无填充部位为  '.'
public class NumberPlace {
    public void solveSudoku(char[][] board) {
        backTrack(board);
    }

    private boolean backTrack(char[][] board) {
        //按行遍历
        for (int i = 0; i < board[0].length; i++) {
            for (int j = 0; j < board[0].length; j++) {
                //如果是已给出的数字，就跳过这一步
                if (board[i][j] != '.') { continue; }
                //若是空位，开始选择可填内容，遍历0~9
                for (char k = '1'; k < '9'; k++) {
                    if (isOK(board, i, j, k)) {
                        //判断填入是否可行，可行则进入下一次递归
                        //因为改变的是最初是的board 所以无需参数传递
                        board[i][j] = k;
                        //进行下一层操作 如果正确返回的是true
                        if (backTrack(board)) { return true; }
                        board[i][j]='.';//回溯
                    }
                }//9个数字试完了都不行，那就是false
                return false;
            }
        }
        return true;
    }

    private boolean isOK(char[][] board, int row, int col, char val) {
        //判断行有无重复
        for (int i = 0; i < 9; i++) { if (board[row][i] == val) { return false; } }
        //判断列有无重复
        for (int i = 0; i < 9; i++) { if (board[i][col] == val) { return false; } }
        //判断所在九宫格有无重复，需要定位对应的九宫格
        int limitRow = (row / 3) * 3;
        int limitCol = (col / 3) * 3;
        for (int i = limitRow; i < limitRow + 3; i++) {
            for (int j = limitCol; j < limitCol + 3; j++) {
                if (board[i][j] == val) {
                    return false;
                }
            }
        }//进行到这一步说明完全合法
        return true;
    }
}
```





# 贪心

**局部最优** 推出 **整体最优**

最好⽤的策略就是**举反例**，如果想不到反例，那么就试⼀试贪⼼

**数学归纳法、反证法**

贪⼼算法⼀般分为如下四步：
	1、将问题分解为若⼲个⼦问题
	2、找出适合的贪⼼策略
	3、求解每⼀个⼦问题的最优解
	4、将局部最优解堆叠成全局最优解

## [142. 环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 `null`。

为了表示给定链表中的环，我们使用整数 `pos` 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 `pos` 是 `-1`，则在该链表中没有环。**注意，`pos` 仅仅是用于标识环的情况，并不会作为参数传递到函数中。**

**说明：**不允许修改给定的链表。

**进阶：**

- 你是否可以使用 `O(1)` 空间解决此题？

 

**示例 1：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist.png)

```
输入：head = [3,2,0,-4], pos = 1
输出：返回索引为 1 的链表节点
解释：链表中有一个环，其尾部连接到第二个节点。
```

**示例 2：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test2.png)

```
输入：head = [1,2], pos = 0
输出：返回索引为 0 的链表节点
解释：链表中有一个环，其尾部连接到第一个节点。
```

**示例 3：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test3.png)

```
输入：head = [1], pos = -1
输出：返回 null
解释：链表中没有环。
```

### 朴素思路，遍历查重

```java
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode detectCycle(ListNode head) {
        ListNode pos = head;
        Set<ListNode> visited = new HashSet<>();
        while (pos != null) {
            if (visited.contains(pos)) {
                return pos;
            } else {
                visited.add(pos);
            }
            pos = pos.next;
        }
        return null;
    }   
}
```

### 快慢指针的空间复杂度最优解O(1)

```java
public class Solution {
    public ListNode detectCycle(ListNode head) {
        ListNode fast=head;
        ListNode slow=head;
        while (fast != null && fast.next != null) {
            slow = slow.next;//慢指针每次一步
            fast = fast.next.next;//快指针一次两步
            //相遇后做以下操作来确定环开始的节点
            if (slow == fast) {
                ListNode index1 = fast;
                ListNode index2 = head;

                while (index1 != index2) {
                    index1 = index1.next;
                    index2 = index2.next;
                }
                return index2;//当二者相等时，表示再走该圈剩余的步数和开始进入到该圈的距离是一样的 
            }
        }
        return null;
    }   
}
```



## [376. 摆动序列](https://leetcode-cn.com/problems/wiggle-subsequence/)

如果连续数字之间的差严格地在正数和负数之间交替，则数字序列称为 **摆动序列 。**第一个差（如果存在的话）可能是正数或负数。仅有一个元素或者含两个不等元素的序列也视作摆动序列。

- 例如， `[1, 7, 4, 9, 2, 5]` 是一个 **摆动序列** ，因为差值 `(6, -3, 5, -7, 3)` 是正负交替出现的。
- 相反，`[1, 4, 7, 2, 5]` 和 `[1, 7, 4, 5, 5]` 不是摆动序列，第一个序列是因为它的前两个差值都是正数，第二个序列是因为它的最后一个差值为零。

**子序列** 可以通过从原始序列中删除一些（也可以不删除）元素来获得，剩下的元素保持其原始顺序。

给你一个整数数组 `nums` ，返回 `nums` 中作为 **摆动序列** 的 **最长子序列的长度** 。

**示例 1：**

```
输入：nums = [1,7,4,9,2,5]
输出：6
解释：整个序列均为摆动序列，各元素之间的差值为 (6, -3, 5, -7, 3) 。
```

**示例 2：**

```
输入：nums = [1,17,5,10,13,15,10,5,16,8]
输出：7
解释：这个序列包含几个长度为 7 摆动序列。
其中一个是 [1, 17, 10, 13, 10, 16, 8] ，各元素之间的差值为 (16, -7, 3, -3, 6, -8) 。
```

**把问题理解成出现几次峰值即可**

```java
class Solution {
    public int wiggleMaxLength(int[] nums) {
        if (nums.length <= 1) return nums.length;
        int curdiff = 0;
        int prediff = 0;
        int res = 1;
        for (int i = 1; i < nums.length; i++) {
            curdiff = nums[i] - nums[i - 1];
            if (curdiff * prediff <= 0) {
                res++;
                prediff = curdiff;
            }
        }
        return res;
    }
}
```



## [53. 最大子序和](https://leetcode-cn.com/problems/maximum-subarray/)

给定一个整数数组 `nums` ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

**示例 1：**

```
输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
```

局部最优的情况下，并记录最⼤的“连续和”，可以推出全局最优。
从代码⻆度上来讲：遍历nums，从头开始⽤count累积，如果count⼀旦加上nums[i]变为负数，那么就
应该从nums[i+1]开始从0累积count了，因为已经变为负数的count，只会拖累总和。

```java
class Solution {
    //如果前面元素和是小于等于零的，就不考虑勤勉，直接更新起点即可。
    public int maxSubArray(int[] nums) {
        int res = Integer.MIN_VALUE;
        int count = 0;
        for (int i : nums) {
            count += i;
            res = Math.max(res, count);
            if (count<=0) count = 0;
        }
        return res;
    }
}
```



## [122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)

给定一个数组 `prices` ，其中 `prices[i]` 是一支给定股票第 `i` 天的价格。

设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。

**注意：**你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

**示例 1:**

```
输入: prices = [7,1,5,3,6,4]
输出: 7
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
```

**贪心算法**：

```java
class Solution {
    public int maxProfit(int[] prices) {
        int res=0;
        for(int i=1;i<prices.length;i++){
            res+=Math.max(prices[i]-prices[i-1],0);
        }
        return res;
    }
}
```

## [714. 买卖股票的最佳时机含手续费](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)

给定一个整数数组 `prices`，其中第 `i` 个元素代表了第 `i` 天的股票价格 ；非负整数 `fee` 代表了交易股票的手续费用。你可以无限次地完成交易，但是你每笔交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。返回获得利润的最大值。

**注意：**这里的一笔交易指买入持有并卖出股票的整个过程，每笔交易你只需要为支付一次手续费。

```
输入: prices = [1, 3, 2, 8, 4, 9], fee = 2
输出: 8
解释: 能够达到的最大利润:  
在此处买入 prices[0] = 1
在此处卖出 prices[3] = 8
在此处买入 prices[4] = 4
在此处卖出 prices[5] = 9
总利润: ((8 - 1) - 2) + ((9 - 4) - 2) = 8.
```

```java
class Solution {
    public int maxProfit(int[] prices, int fee) {
        int result = 0;
        int minPrice = prices[0];
        for (int i = 0; i < prices.length; i++) {
            //相当于买入
            if (prices[i]<minPrice) minPrice = prices[i];
            //保持原有状态
            if (prices[i]>minPrice &&prices[i]<=minPrice+fee) continue;
            //计算利润
            if (prices[i] > minPrice + fee) {
                result += prices[i] - minPrice - fee;
                minPrice = prices[i] - fee;//这步的意义在于下次还是比之前高，就意味着上次没有卖出操作，需要减去一次交易手续费
            }
        }
        return result;
    }
}
```



## [55. 跳跃游戏](https://leetcode-cn.com/problems/jump-game/)

给定一个非负整数数组 `nums` ，你最初位于数组的 **第一个下标** 。

数组中的每个元素代表你在该位置可以跳跃的最大长度。

判断你是否能够到达最后一个下标。

```
输入：nums = [2,3,1,1,4]
输出：true
解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
```

```
输入：nums = [3,2,1,0,4]
输出：false
解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。
```

```java
public boolean canJump(int[] nums) {
        if (nums.length==1) return true;
        int l = nums.length;
        int cover = 0;
        for (int i = 0; i <= cover ; i++) {
            cover = Math.max(cover, i + nums[i]);
            if (cover>=l-1) return true;
        }
        return false;
    }
```

## [45. 跳跃游戏 II](https://leetcode-cn.com/problems/jump-game-ii/)

给定一个非负整数数组，你最初位于数组的第一个位置。

数组中的每个元素代表你在该位置可以跳跃的最大长度。

你的目标是使用最少的跳跃次数到达数组的最后一个位置。

假设你总是可以到达数组的最后一个位置。

```
输入: [2,3,1,1,4]
输出: 2
解释: 跳到最后一个位置的最小跳跃数是 2。
     从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
```

```
输入: [2,3,0,1,4]
输出: 2
```

```java
class Solution {
    public int jump(int[] nums) {
        int cur = 0, res = 0, next = 0;
        for (int i = 0; i < nums.length - 1; i++) {
            next = Math.max(i + nums[i], next);
            if (i == cur) {
                cur = next;
                res++;
            }
        }
        return res;
    }
}
```



## [1005. K 次取反后最大化的数组和](https://leetcode-cn.com/problems/maximize-sum-of-array-after-k-negations/)

给定一个整数数组 A，我们**只能**用以下方法修改该数组：我们选择某个索引 `i` 并将 `A[i]` 替换为 `-A[i]`，然后总共重复这个过程 `K` 次。（我们可以多次选择同一个索引 `i`。）

以这种方式修改数组后，返回数组可能的最大和。

```
输入：A = [4,2,3], K = 1
输出：5
解释：选择索引 (1,) ，然后 A 变为 [4,-2,3]。
```

```
输入：A = [3,-1,0,2], K = 3
输出：6
解释：选择索引 (1, 2, 2) ，然后 A 变为 [3,1,0,2]。
```

```java
class Solution {
    public int largestSumAfterKNegations(int[] nums, int k) {
        Arrays.sort(nums);
        for (int i = 0; i < nums.length; i++) {
            //有负数先掰正
            if (nums[i] < 0 && k > 0) {
                nums[i] *= -1;
                k--;
            }
        }
        //到这一步如果k还有值，就是对正数数组做改变了
        Arrays.sort(nums);
        if(k%2==1) nums[0] *= -1;
        int res = 0;
        for (int i : nums) {
            res += i;
        }
        return res;
    }
}
```



## [134. 加油站](https://leetcode-cn.com/problems/gas-station/)

在一条环路上有 *N* 个加油站，其中第 *i* 个加油站有汽油 `gas[i]` 升。

你有一辆油箱容量无限的的汽车，从第 *i* 个加油站开往第 *i+1* 个加油站需要消耗汽油 `cost[i]` 升。你从其中的一个加油站出发，开始时油箱为空。

如果你可以绕环路行驶一周，则返回出发时加油站的编号，否则返回 -1。

- 如果题目有解，该答案即为唯一答案。
- 输入数组均为非空数组，且长度相同。
- 输入数组中的元素均为非负数。

```
输入: 
gas  = [1,2,3,4,5]
cost = [3,4,5,1,2]
输出: 3
```

**分情景区别**：

```java
class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int curSum = 0;
        int min = Integer.MAX_VALUE;
        for (int i = 0; i < gas.length; i++) {
            int rest = gas[i] - cost[i];
            curSum += rest;
            min = Math.min(min, curSum);//记录过程中出现过的的最小情况
        }
        if (curSum<0) return -1;
        if (min>=0 ) return 0;
        for (int i = gas.length - 1; i >= 0; i--) {
            int rest = gas[i] - cost[i];
            min += rest;
            if (min >= 0) {
                return i;
            }
        }
        return -1;
    }
}
```

**贪心算法：**

```java
class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int curSum = 0;
        int totalSum = 0;
        int start = 0;
        for (int i = 0; i < gas.length; i++) {
            curSum += gas[i] - cost[i];
            totalSum += gas[i] - cost[i];
            if (curSum < 0) {//更新节点
                start = i + 1;
                curSum = 0;
            }
        }
        if (totalSum < 0)  return -1;
        return start;
    }
}
```



## [135. 分发糖果](https://leetcode-cn.com/problems/candy/)

老师想给孩子们分发糖果，有 *N* 个孩子站成了一条直线，老师会根据每个孩子的表现，预先给他们评分。

你需要按照以下要求，帮助老师给这些孩子分发糖果：

- 每个孩子至少分配到 1 个糖果。
- 评分更高的孩子必须比他两侧的邻位孩子获得更多的糖果。

那么这样下来，老师至少需要准备多少颗糖果呢？

```
输入：[1,0,2]
输出：5
解释：你可以分别给这三个孩子分发 2、1、2 颗糖果。
```

```
输入：[1,2,2]
输出：4
解释：你可以分别给这三个孩子分发 1、2、1 颗糖果。
     第三个孩子只得到 1 颗糖果，这已满足上述两个条件。
```

贪心算法，先左往右，在右往左

```java
class Solution {
    public int candy(int[] ratings) {
        int[] candyVec = new int[ratings.length];
        Arrays.fill(candyVec,1);
        //左往右
        for (int i = 1; i < ratings.length; i++) {
            if (ratings[i]>ratings[i-1]) candyVec[i] = candyVec[i - 1] + 1;
        }
        //右往左
        for (int i = ratings.length - 2; i >= 0; i--) {
            if (ratings[i]>ratings[i+1]) candyVec[i] = Math.max(candyVec[i + 1] + 1, candyVec[i]);
        }
        int result = 0;
        for (int c : candyVec) {
            result += c;
        }
        return result;
    }
}
```



## [406. 根据身高重建队列](https://leetcode-cn.com/problems/queue-reconstruction-by-height/)

假设有打乱顺序的一群人站成一个队列，数组 `people` 表示队列中一些人的属性（不一定按顺序）。每个 `people[i] = [hi, ki]` 表示第 `i` 个人的身高为 `hi` ，前面 **正好** 有 `ki` 个身高大于或等于 `hi` 的人。

请你重新构造并返回输入数组 `people` 所表示的队列。返回的队列应该格式化为数组 `queue` ，其中 `queue[j] = [hj, kj]` 是队列中第 `j` 个人的属性（`queue[0]` 是排在队列前面的人）。

```
输入：people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
输出：[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]
解释：
编号为 0 的人身高为 5 ，没有身高更高或者相同的人排在他前面。
编号为 1 的人身高为 7 ，没有身高更高或者相同的人排在他前面。
编号为 2 的人身高为 5 ，有 2 个身高更高或者相同的人排在他前面，即编号为 0 和 1 的人。
编号为 3 的人身高为 6 ，有 1 个身高更高或者相同的人排在他前面，即编号为 1 的人。
编号为 4 的人身高为 4 ，有 4 个身高更高或者相同的人排在他前面，即编号为 0、1、2、3 的人。
编号为 5 的人身高为 7 ，有 1 个身高更高或者相同的人排在他前面，即编号为 1 的人。
因此 [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]] 是重新构造后的队列。
```

```java
class Solution {
    public int[][] reconstructQueue(int[][] people) {
        Arrays.sort(people, new Comparator<int[]>() {
            public int compare(int[] person1, int[] person2) {
                if (person1[0] != person2[0]) {
                    return person2[0] - person1[0];
                } else {
                    return person1[1] - person2[1];
                }
            }
        });
        List<int[]> ans = new ArrayList<>();
        for (int[] person : people) {
            ans.add(person[1], person );
        }
        return ans.toArray(new int[ans.size()][]);
    }
}
```



## [452. 用最少数量的箭引爆气球](https://leetcode-cn.com/problems/minimum-number-of-arrows-to-burst-balloons/)

在二维空间中有许多球形的气球。对于每个气球，提供的输入是水平方向上，气球直径的开始和结束坐标。由于它是水平的，所以纵坐标并不重要，因此只要知道开始和结束的横坐标就足够了。开始坐标总是小于结束坐标。

一支弓箭可以沿着 x 轴从不同点完全垂直地射出。在坐标 x 处射出一支箭，若有一个气球的直径的开始和结束坐标为 `x``start`，`x``end`， 且满足  `xstart ≤ x ≤ x``end`，则该气球会被引爆。可以射出的弓箭的数量没有限制。 弓箭一旦被射出之后，可以无限地前进。我们想找到使得所有气球全部被引爆，所需的弓箭的最小数量。

给你一个数组 `points` ，其中 `points [i] = [xstart,xend]` ，返回引爆所有气球所必须射出的最小弓箭数。

```
输入：points = [[10,16],[2,8],[1,6],[7,12]]
输出：2
解释：对于该样例，x = 6 可以射爆 [2,8],[1,6] 两个气球，以及 x = 11 射爆另外两个气球
```

```java
class Solution {
    public int findMinArrowShots(int[][] points) {
        Arrays.sort(points, new Comparator<int[]>() {
            @Override
            public int compare(int[] o1, int[] o2) {
                if (o1[0] != o2[0]) {
                    if (o1[0] > o2[0]) {
                        return 1;
                    } else if (o1[0] < o2[0]) {
                        return -1;
                    } else {
                        return 0;
                    }
                } else {
                    if (o1[1] > o2[1]) {
                        return 1;
                    } else if (o1[1] < o2[1]) {
                        return -1;
                    } else {
                        return 0;
                    }
                }
            }
        });
        int res = 1;
        for (int i = 1; i < points.length; i++) {
            if (points[i][0] > points[i - 1][1]) {
                res++;//相邻气球不挨着就加一
            } else {
                //更新最小右边界
                points[i][1] = Math.min(points[i - 1][1], points[i][1]);
            }
        }
        return res;
    }
}

```

重写compare的时候最好不直接返回两数相减，而是设置返回1，0，-1

不然 [[-2147483646,-2147483645],[2147483646,2147483647]]类似样例溢出

## [435. 无重叠区间](https://leetcode-cn.com/problems/non-overlapping-intervals/)

给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。

1. 可以认为区间的终点总是大于它的起点。
2. 区间 [1,2] 和 [2,3] 的边界相互“接触”，但没有相互重叠。

```
输入: [ [1,2], [2,3], [3,4], [1,3] ]
输出: 1
解释: 移除 [1,3] 后，剩下的区间没有重叠。
```

```
输入: [ [1,2], [1,2], [1,2] ]
输出: 2
解释: 你需要移除两个 [1,2] 来使剩下的区间没有重叠。
```

```java
class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, new Comparator<int[]>() {
            @Override
            public int compare(int[] o1, int[] o2) {
                if (o1[1] > o2[1]) {
                    return 1;
                } else if (o1[1] < o2[1]) {
                    return -1;
                } else {
                    return 0;
                }
            }
        });
        int count = 1;//记录非交叉区间个数
        int end = intervals[0][1];
        for (int[] interval : intervals) {
            if (end <= interval[0]) {
                end = interval[1];//不重叠就跳过该项
                count++;
            }
        }
        return intervals.length - count;
    }
}
```

## [763. 划分字母区间](https://leetcode-cn.com/problems/partition-labels/)

字符串 `S` 由小写字母组成。我们要把这个字符串划分为尽可能多的片段，同一字母最多出现在一个片段中。返回一个表示每个字符串片段的长度的列表。

```
输入：S = "ababcbacadefegdehijhklij"
输出：[9,7,8]
解释：
划分结果为 "ababcbaca", "defegde", "hijhklij"。
每个字母最多出现在一个片段中。
像 "ababcbacadefegde", "hijhklij" 的划分是错误的，因为划分的片段数较少。
```

在遍历的过程中相当于是要找每⼀个字⺟的边界，如果找到之前遍历过的所有字⺟的**最远边界**，说明这个边界就是
分割点了

<img src="C:\Users\23143\AppData\Roaming\Typora\typora-user-images\image-20210524194956997.png" alt="image-20210524194956997" style="zoom:67%;" />



```java
class Solution {
    public List<Integer> partitionLabels(String s) {
        int[] hash = new int[27];//i为字符，hash[i]为字符出现的最后位置
        for (int i = 0; i < s.length(); i++) {
            hash[s.charAt(i) - 'a'] = i;
        }
        List<Integer> res = new ArrayList<>();
        int left = 0, right = 0;
        for (int i = 0; i < s.length(); i++) {
            right = Math.max(right, hash[s.charAt(i) - 'a']);//找到字符出现的最远边界
            if (i == right) {
                res.add(right - left + 1);
                left = i + 1;
            }
        }
        return res;
    }
}
```



## [56. 合并区间](https://leetcode-cn.com/problems/merge-intervals/)

以数组 `intervals` 表示若干个区间的集合，其中单个区间为 `intervals[i] = [starti, endi]` 。请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。

```
输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
```

```
输入：intervals = [[1,4],[4,5]]
输出：[[1,5]]
解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
```

```java
class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, new Comparator<int[]>() {
            @Override
            public int compare(int[] o1, int[] o2) {
                if (o1[0] > o2[0]) {
                    return 1;
                } else if (o1[0] < o2[0]) {
                    return -1;
                } else return 0;
            }
        });//左端点排序 正序

        List<int[]> merged = new ArrayList<int[]>();
        for (int i = 0; i < intervals.length; ++i) {
            int L = intervals[i][0], R = intervals[i][1];
            if (merged.size() == 0 || merged.get(merged.size() - 1)[1] < L) {
                merged.add(new int[]{L, R});
            } else {
                merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], R);
            }
        }
        return merged.toArray(new int[merged.size()][]);
    }
}
```

## [738. 单调递增的数字](https://leetcode-cn.com/problems/monotone-increasing-digits/)

给定一个非负整数 `N`，找出小于或等于 `N` 的最大的整数，同时这个整数需要满足其各个位数上的数字是单调递增。（当且仅当每个相邻位数上的数字 `x` 和 `y` 满足 `x <= y` 时，我们称这个整数是单调递增的。）

```
输入: N = 10    输出: 9
```

```
输入: N = 1234  输出: 1234
```

```
输入: N = 332   输出: 299
```

```java
class Solution {
    public int monotoneIncreasingDigits(int n) {
        char[] s = Integer.toString(n).toCharArray();//数字->字符串->字符数组，来统计位数
        int flag = s.length;//位数
        for (int i = s.length - 1; i > 0; i--) {
            if (s[i - 1] > s[i]) {
                flag = i;
                s[i - 1]--;//后一位比前一位小，最后一位变成9，则前一位依次降一位置
            }
        }
        for (int i = flag; i < s.length; i++) {
            s[i] = '9';
        }   
        return Integer.valueOf(String.valueOf(s));
        //return Integer.parseInt(new String(strN)); //另一种写法
    }
}
```



# 动态规划⭐

## 动态规划

基础

------

### 1、斐波那契数列

LC509

```java
class Solution {
    public int fib(int n) {
        if (n <= 1) {return n;}
        int a = 0, b = 1;
        for (int i = 2; i <= n; i++) {
            int tmp = a + b;
            a = b;
            b = tmp;
        }
        return b;
        //递归法
        // if (n < 2) { return n; }
        // return fib(n - 1) + fib(n - 2);
    }
}
```

### 2、爬楼梯

```java
public class LC70 {
    public int climbStairs(int n) {
        int[] dp =new int[n+1];
        dp[0] = 0;	dp[1] = 1;
        for (int i = 2; i <= n; i++) { dp[i] = dp[i - 1] + dp[i - 2]; }
        return dp[n];
    }
}
```

### 3、使用最小花费爬楼梯

```java
public class LC746 {
    public int minCostClimbingStairs(int[] cost) {
        if (cost.length < 2) { return 0; }
        int[] dp = new int[cost.length + 1];
        //dp鸟事前一步踩在i级阶梯花费的最小代价
        dp[0] = cost[0];	dp[1] = cost[1];
        dp[2] = Math.min(dp[0], dp[1]) + cost[2];
        for (int i = 3; i < cost.length; i++) {
            dp[i] = Math.min(dp[i - 1], dp[i - 2]) + cost[i];
        }
        //最后一步或者二步可以跨出，所以就找倒数一二级阶梯的最小花费
        return Math.min(dp[cost.length - 1], dp[cost.length - 2]);
    }
}
```

### 4、不同路径

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角，问总共有多少条不同的路径？

```java
public class LC62 {
    public int uniquePaths(int m, int n) {
        int[][] dp = new int[m][n];
        for (int i = 0; i < n; i++) { dp[0][i] = 1; }
        for (int i = 0; i < m; i++) { dp[i][0] = 1; }
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }
        return dp[m - 1][n - 1];
    }
}
```

### 5、不同路径（障碍）

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？

```java
public class LC63 {
    public int uniquePathsWithObstacles(int[][] obstacleGrid) {
        int m = obstacleGrid.length, n = obstacleGrid[0].length;
        int[][] dp = new int[m][n];
        for (int i = 0; i < n; i++) {
            if (obstacleGrid[0][i]==1) break;
            dp[0][i] = 1;
        }
        for (int i = 0; i < m; i++) {
            if (obstacleGrid[i][0]==1) break;
            dp[i][0] = 1;
        }
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (obstacleGrid[i][j]==1) continue;
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }
        return dp[m - 1][n - 1];
    }
}
```

### 6、整数拆分

给定一个正整数 n，将其拆分为至少两个正整数的和，并使这些整数的乘积最大化。 返回你可以获得的最大乘积。

```java
public class LC343 {
    public int integerBreak(int n) {
        //----------------贪心--------------------
        /*if (n <= 3) { return n - 1; }
        int a = n / 3;
        int b = n % 3;
        if (b == 0) {
            return (int) Math.pow(3, a);
        } else if (b == 1) {
            return (int) Math.pow(3, a - 1) * 4;
        } else {
            return (int) Math.pow(3, a) * 2;
        }*/
        //----------------------------------------
        // 动态规划
        int[] dp = new int[n + 1];
        dp[2] = 1;
        for (int i = 3; i <= n; i++) {
            for (int j = 1; j < i - 1; j++) {
                dp[i] = Math.max(dp[i], Math.max((i - j) * dp[i - j], (i - j) * j));
            }
        }
        return dp[n];
    }
}
```

### 7、不同的搜索二叉树

给定一个整数 n，求以 1 ... n 为节点组成的二叉搜索树有多少种？

```java
/*	dp[3]，就是 元素1为头结点搜索树的数量 + 元素2为头结点搜索树的数量 + 元素3为头结点搜索树的数量
dp[3] = dp[2] * dp[0] + dp[1] * dp[1] + dp[0] * dp[2
递推到更高数值：
for (int j = 1; j <= i; j++) {	 dp[i] += dp[j - 1] * dp[i - j];	}
*/
public class LC96 {
    public int numTrees(int n) {
        int[] dp = new int[n + 1];
        dp[0] = 1;	dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                dp[i] += dp[j - 1] * dp[i - j];
            }
        }
        return dp[n];
    }
}
```



## 买卖股票

### 1、买卖股票的最佳时机（一次）

你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。

本题在贪心模块有贪心算法思想实现

```java
public class LC121 {
    public int maxProfit(int[] prices) {
        //贪心
//        int low = Integer.MAX_VALUE;
//        int res = 0;
//        for (int price : prices) {
//            low = Math.min(low, price);
//            res = Math.max(res, price - low);
//        }
//        return res;
        //动态规划
        int len = prices.length;
        if (len == 0) { return 0; }
        int buy = -prices[0];//因为全过程一次买入，所以当买入第i天时，当前有的钱的就是-price[i]
        int hold = 0;//持有收益，就是当前价格减去之前买入最小值
        for (int i = 1; i < len; i++) {
            int sold = buy + prices[i];
            buy = Math.max(buy, -prices[i]);
            hold = Math.max(hold, sold);
        }
        return hold;
    }
}
```

### 2、买卖股票的最佳时机2（多次）

设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）

```java
public class LC122 {
    public int maxProfit(int[] prices) {
//        if (prices.length <= 1) { return 0; }
//        int res = 0;
//        for (int i = 1; i < prices.length; i++) {
//            res += Math.max(prices[i] - prices[i - 1], 0);
//        }
//        return res;

        //动态规划
        int len = prices.length;
        if (len == 0) { return 0; }
        int have = -prices[0];//第i天拥有股票
        int nothave = 0;//第i天没有股票
        for (int i = 1; i < len; i++) {
            int sold = have + prices[i];
            have = Math.max(have, nothave - prices[i]);
            nothave = Math.max(sold, nothave);
        }
        return nothave;
    }
}
```

### 3、买卖股票的最佳时机3（最多两次）

```java
public class LC123 {
    public int maxProfit(int[] prices) {
        if (prices.length == 0) {
            return 0;
        }
        //第i天的五个状态操作
        //0、1、2、3、4
        //不操作、1买入、1卖出、2买入、2卖出
        int[][] dp = new int[prices.length][5];
        dp[0][1] = -prices[0];
        dp[0][3] = -prices[0];
        for (int i = 1; i < prices.length; i++) {
            dp[i][0] = dp[i - 1][0];
            dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
            dp[i][2] = Math.max(dp[i - 1][2], dp[i - 1][1] + prices[i]);
            dp[i][3] = Math.max(dp[i - 1][3], dp[i - 1][2] - prices[i]);
            dp[i][4] = Math.max(dp[i - 1][4], dp[i - 1][3] + prices[i]);
        }
        return dp[prices.length - 1][4];

    }
}
```

### 4、买卖股票的最佳时机4（k次）

给定一个整数数组 prices ，它的第 i 个元素 prices[i] 是一支给定的股票在第 i 天的价格。设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

```java
public class LC188 {
    public int maxProfit(int k, int[] prices) {
        if (prices.length == 0) {
            return 0;
        }
        //第i天的五个状态操作
        //0、1、2、3、4、5……
        //不操作、1买入、1卖出、2买入、2卖出、3买入……
        int[][] dp = new int[prices.length][2 * k + 1];
        for (int j = 1; j < 2 * k; j += 2) {
            dp[0][j] = -prices[0];
        }
        for (int i = 1; i < prices.length; i++) {
            for (int j = 0; j < 2 * k - 1; j += 2) {
                dp[i][0] = dp[i - 1][0];
                dp[i][j + 1] = Math.max(dp[i - 1][j + 1], dp[i - 1][j] - prices[i]);
                dp[i][j + 2] = Math.max(dp[i - 1][j + 2], dp[i - 1][j + 1] + prices[i]);
            }
        }
        return dp[prices.length - 1][2 * k];
    }
}
```

### 5、买卖股票的最佳时机（冷冻期）

给定一个整数数组，其中第 i 个元素代表了第 i 天的股票价格 。

设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:

- 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
- 卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。

示例: 输入: [1,2,3,0,2] 输出: 3 解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出]

```java
public class LC309 {
    public int maxProfit(int[] prices) {
        int n = prices.length;
        if (n < 2) { return 0; }
        int[][] dp = new int[n][2];
        //dp[][j]   j=0 持有或卖出  j=1 买入或持有
        dp[0][0] = 0;
        dp[0][1] = -prices[0];
        dp[1][0] = Math.max(dp[0][0], dp[0][1] + prices[1]);
        dp[1][1] = Math.max(dp[0][1], -prices[1]);
        for (int i = 2; i < n; i++) {
            dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);//今天的持有状态时前一天的持有状态或者前一天进行了买出操作的状态
            dp[i][1] = Math.max(dp[i - 1][1], dp[i - 2][0] - prices[i]);//当天的买入状态时昨天买入状态或者前天的卖出状态加上今天买入，隔开一天冷冻期
        }
        return dp[n - 1][0];
    }
}
```

### 6、买卖股票的最佳时机（手续费）

你可以无限次地完成交易，但是你每笔交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。返回获得利润的最大值。
注意：这里的一笔交易指买入持有并卖出股票的整个过程，每笔交易你只需要为支付一次手续费。

```java
public class LC714 {
    public int maxProfit(int[] prices, int fee) {
        int n = prices.length;
        if (n < 2) { return 0;}
        int buy = -prices[0];
        int sell = 0;
        //卖出时支付手续费
        //若改成买入时支付手续费，则-fee加载buy就行
        for (int i = 1; i < n; i++) {
            int tmp = buy;
            buy = Math.max(buy, sell - prices[i]);
            sell = Math.max(sell, tmp + prices[i] - fee);
        }
        return Math.max(buy, sell);
    }
}
```

## 子序列问题

### 1、最长递增子序列（不连续）

给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。

子序列是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。

```java
public class LC300 {
    public int lengthOfLIS(int[] nums) {
        if (nums.length==1) return 1;
        int[] dp = new int[nums.length];
        Arrays.fill(dp, 1);
        int res = 0;
        for (int i = 1; i < nums.length; i++) {
            for (int j = 0; j < i; j++) {
                //要判断当前i是否比之前的j大，才能进行+1
                if (nums[i] > nums[j]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
            res = Math.max(dp[i], res);
        }
        return res;
    }
}
```

### 2、最长连续递增子序列

给定一个未经排序的整数数组，找到最长且 连续递增的子序列，并返回该序列的**长度**。

```java
public class LC674 {
    public int findLengthOfLCIS(int[] nums) {
        if (nums.length == 1) {
            return 1;
        }
//        int[] dp = new int[nums.length];
        int res = 1;
        int ans = 0;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] > nums[i - 1]) {
                res++;
            } else {
                res = 1;
            }
            ans = Math.max(res, ans);
        }
        return ans;
    }
}
```

### 3、最长重复子数组

给两个整数数组 A 和 B ，返回两个数组中公共的、长度最长的子数组的长度。

```java
public class LC718 {
    public int findLength(int[] nums1, int[] nums2) {
        int m = nums1.length + 1, n = nums2.length + 1;
        int[][] dp = new int[m][n];
        int res = 0;
        Arrays.fill(dp, 0);
        for (int i = 0; i < m-1; i++) {
            for (int j = 0; j < n - 1; j++) {
                if (nums1[i] == nums2[j]) {
                    dp[i + 1][j + 1] = dp[i][j] + 1;
                }
                res = Math.max(dp[i + 1][j + 1], res);
            }
        }
        return res;

    }
}
```

### 4、最长公共子序列（不连续）

给定两个字符串 text1 和 text2，返回这两个字符串的最长公共子序列的**长度**。

一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的**相对顺序**的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。

例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。两个字符串的「公共子序列」是这两个字符串所共同拥有的子序列。若这两个字符串没有公共子序列，则返回 0。

```java
public class LC1143 {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length() + 1, n = text2.length() + 1;
        int[][] dp = new int[m][n];
        for (int i = 0; i < m - 1; i++) {
            for (int j = 0; j < n - 1; j++) {
                if (text1.charAt(i) == text2.charAt(j)) {
                    dp[i + 1][j + 1] = dp[i][j] + 1;
                } else {
                    dp[i + 1][j + 1] = Math.max(dp[i + 1][j], dp[i][j + 1]);
                }
            }
        }
        return dp[m - 1][n - 1];
    }
}
```

### 5、不相交的线

我们在两条独立的水平线上按给定的顺序写下 A 和 B 中的整数。现在，我们可以绘制一些连接两个数字 A[i] 和 B[j] 的直线，只要 A[i] == B[j]，且我们绘制的直线不与任何其他连线（非水平线）相交。以这种方法绘制线条，并返回我们可以绘制的最大连线数。

本质上就是**最长公共子序列**

```java
public class LC1035 {
    public int maxUncrossedLines(int[] nums1, int[] nums2) {
        int m = nums1.length + 1, n = nums2.length + 1;
        int[][] dp = new int[m][n];
        for (int i = 0; i < m - 1; i++) {
            for (int j = 0; j < n - 1; j++) {
                if (nums1[i] == nums2[j]) {
                    dp[i + 1][j + 1] = dp[i][j] + 1;
                } else {
                    dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j]);
                }
            }
        }
        return dp[m - 1][n - 1];
    }
}
```

### 6、最大子序和

给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
示例: 输入: [-2,1,-3,4,-1,2,1,-5,4] 输出: 6 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。

```java
public class LC53 {
    public int maxSubArray(int[] nums) {
        //贪心算法
//        int res = Integer.MIN_VALUE;
//        int count = 0;
//        for (int i : nums) {
//            count += i;
//            res = Math.max(res, count);
//            if (count<=0) count = 0;
//        }
//        return res;
        //动态规划
        if (nums.length == 0) { return 0; }
        int[] dp = new int[nums.length];
        dp[0] = nums[0];
        int res = dp[0];
        for (int i = 1; i < nums.length; i++) {
            dp[i] = Math.max(dp[i-1] + nums[i], nums[i]);
            res = Math.max(dp[i], res);
        }
        return res;
    }
}
```

### 7、判断子序列

给定字符串 s 和 t ，判断 s 是否为 t 的子序列。

字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符**相对位置**形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。

区别于KMP算法所求的字符串匹配问题LC28

```java
public class LC392 {
    public boolean isSubsequence(String s, String t) {
        int m = s.length() + 1;
        int n = t.length() + 1;
        int[][] dp = new int[m][n];
        for (int i = 0; i < m - 1; i++) {
            for (int j = 0; j < n - 1; j++) {
                if (s.charAt(i) == t.charAt(j)) {
                    dp[i + 1][j + 1] = dp[i][j] + 1;
                } else {
                    dp[i + 1][j + 1] = dp[i + 1][j];
                }
            }
        }
        return dp[m - 1][n - 1] == s.length();
    }
}
```

### 8、不同的子序列

给定一个字符串 s 和一个字符串 t ，计算在 s 的子序列中 t 出现的个数。字符串的一个 子序列 是指，通过删除一些（也可以不删除）字符且不干扰剩余字符相对位置所组成的新字符串。（例如，"ACE" 是 "ABCDE" 的一个子序列，而 "AEC" 不是）

```java
public class LC115 {
    public int numDistinct(String s, String t) {
        int m = s.length() + 1;
        int n = t.length() + 1;
        int[][] dp = new int[m][n];//[m][n]对应s[m-1]t[n-1]
        //初始化
        for (int i = 0; i < n-1; i++) { dp[0][i] = 0; }
        for (int i = 0; i < m-1; i++) { dp[i][0] = 1; }
        //遍历
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (s.charAt(i - 1) == t.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
                } else {
                    dp[i][j] = dp[i - 1][j];
                }
            }
        }
        return dp[m - 1][n - 1];
    }
}
```



## 编辑操作

### 1、编辑距离

给你两个单词 word1 和 word2，请你计算出将 word1 转换成 word2 所使用的最少操作数 。
你可以对一个单词进行如下三种操作：

- 插入一个字符

- 删除一个字符

- 替换一个字符

  示例 1：   输入：word1 = "horse", word2 = "ros" 输出：3 
  解释： 	 horse -> rorse (将 'h' 替换为 'r') rorse -> rose (删除 'r') rose -> ros (删除 'e') 

```java
public class LC72 {
    public int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m + 1][n + 1];
        //初始化
        for (int i = 0; i <= m; i++) { dp[i][0] = i; }
        for (int i = 0; i <= n; i++) { dp[0][i] = i; }
        //动态规划
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    //看似只有增和改操作，其实删和增的操作数是一样的：word2添加一个元素，相当于word1删除一个元素
                    dp[i][j] = Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1])) + 1;
                }
            }
        }
        return dp[m][n];
    }
}
```

### 2、回文子串

给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。
具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。

示例 1：输入："abc" 输出：3 	解释：三个回文子串: "a", "b", "c"
示例 2：输入："aaa" 输出：6 解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"

```java
public class LC647 {
    public int countSubstrings(String s) {
        int n = s.length();
        boolean[][] dp = new boolean[n][n];//默认false
        int res = 0;
        //初始化：
        for (int i = 0; i < n; i++) { dp[i][i] = true; }
        //动态规划
        for (int i = n - 1; i >= 0; i--) {
            for (int j = i; j < n; j++) {
                if (s.charAt(i) == s.charAt(j)) {
                    if (j - i <= 1) {
                        dp[i][j] = true;
                        res++;
                    } else if (dp[i + 1][j - 1]) {
                        res++;
                        dp[i][j] = true;
                    }
                }
            }
        }
        return res;
    }
}
```

### 3、最长回文子序列

给定一个字符串 s ，找到其中最长的回文子序列，并返回该序列的**长度**。
可以假设 s 的最大长度为 1000 。

示例 1: 	输入: "bbbab" 	 输出: 	4 一个可能的最长回文子序列为 "bbbb"。
示例 2:	 输入: "cbbd" 	   输出: 	2 一个可能的最长回文子序列为 "bb"。

```java
public class LC516 {
    public int longestPalindromeSubseq(String s) {
        int n = s.length();
        int[][] dp = new int[n + 1][n + 1];
        //初始化
        for (int i = 0; i < n; i++) { dp[i][i] = 1; }
        //动态规划
        for (int i = n - 1; i >= 0; i--) {
            for (int j = i+1; j < n; j++) {
                if (s.charAt(i) == s.charAt(j)) {
                    dp[i][j] = dp[i + 1][j - 1] + 2;
                } else {
                    dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[0][n-1];
    }
}

```

​       

## 背包问题 

### 01背包   

每个物品取一次或者不取  0、1

**i 表示物品  j 表示容量**

#### 二维数组

```java
//先遍历物品，然后遍历背包重量的代码   √
// weight数组的大小 就是物品个数
int[][] dp=new int[weight.size()+1][bagWeight+1];
//初始化
for (int j = weight[0]; j <= bagWeight; j++) { dp[0][j] = value[0]; }
for(int i = 1; i < weight.size(); i++) { // 遍历物品
    for(int j = 0; j <= bagWeight; j++) { // 遍历背包容量
        if (j < weight[i]) dp[i][j] = dp[i - 1][j]; // 这个是为了展现dp数组里元素的变化
        else dp[i][j] = max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i]);

    }
}

// weight数组的大小 就是物品个数
for(int j = 0; j <= bagWeight; j++) { // 遍历背包容量
    for(int i = 1; i < weight.size(); i++) { // 遍历物品
        if (j < weight[i]) dp[i][j] = dp[i - 1][j];
        else dp[i][j] = max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i]);
    }
}

```

作用效果一样，但是后序有区别在于，这两个顺序再完全背包问题中可以得出不同类型的排列组合

**遍历区别**

先遍历背包、再遍历物品   **排列数**   如1、2 和2、1都会记录

先遍历物品、再遍历背包   **组合数**   出现1、2就不会出现2、1



#### 一维数组（滚动数组）

**固定模板：**只能先遍历物品在嵌套背包容量，且容量遍历时倒序！！！

核心：**大到小的遍历**

```java
for(int i = 0; i < weight.size(); i++) { // 遍历物品
    for(int j = bagWeight; j >= weight[i]; j--) { // 遍历背包容量  注意j的范围时>=对应i物品
        dp[j] = max(dp[j], dp[j - weight[i]] + value[i]);
    }
}
```

1、能否实现问题，一般只要最后的值与目标值相等

2、**求装满背包有几种方法，一般公式都是：dp[j] += dp[j - nums[i]];**

​		首先dp[0]一定要为1，dp[0] = 1是 递归公式的基础。



### 完全背包

一个物品可以装载多次

与01背包区别：**小到大遍历**

完全背包中，两个for循环的先后循序，都不影响计算dp[j]所需要的值

**组合不强调元素之间的顺序，排列强调元素之间的顺序**

```java
//组合
// 先遍历物品，再遍历背包 
//初始化
dp[0]=1;
for(int i = 0; i < weight.size(); i++) { // 遍历物品
    for(int j = weight[i]; j < bagWeight ; j++) { // 遍历背包容量
        dp[j] = max(dp[j], dp[j - weight[i]] + value[i]);
    }
}
//排列
// 先遍历背包，再遍历物品
for(int j = 0; j <= bagWeight; j++) { // 遍历背包容量
    for(int i = 0; i < weight.size(); i++) { // 遍历物品
        if (j - weight[i] >= 0) dp[j] = max(dp[j], dp[j - weight[i]] + value[i]);
    }
    cout << endl;
}

```

**很好理解：**
**先物品后容量：**想象成这个物品取用之后与否只有0、1情况，之后就考虑对应取用之后的背包容量了，取了就不会再回来再取一次，未取用则可能能下次考虑，所以时组合情况。

**先容量后背包：**每次容量往后递增的时候都是从第一个物品开始从头考虑，所以就存在这这个物品反复出现再解决方案中的情况，所以是排列问题，顺序会变。



### 多重背包

多一步将物品铺开变成01背包问题即可

```c++
void test_multi_pack() {
    vector<int> weight = {1, 3, 4};
    vector<int> value = {15, 20, 30};
    vector<int> nums = {2, 3, 2};
    int bagWeight = 10;
    vector<int> dp(bagWeight + 1, 0);


    for(int i = 0; i < weight.size(); i++) { // 遍历物品
        for(int j = bagWeight; j >= weight[i]; j--) { // 遍历背包容量
            // 以上为01背包，然后加一个遍历个数
            for (int k = 1; k <= nums[i] && (j - k * weight[i]) >= 0; k++) { // 遍历个数
                dp[j] = max(dp[j], dp[j - k * weight[i]] + k * value[i]);
            }
        }
        // 打印一下dp数组
        for (int j = 0; j <= bagWeight; j++) {
            cout << dp[j] << " ";
        }
        cout << endl;
    }
    cout << dp[bagWeight] << endl;
}
int main() {
    test_multi_pack();
}
```



## 打家劫舍问题

### 打家劫舍I	LC198

你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。
示例 1： 输入：[1,2,3,1] 输出：4 解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。  偷窃到的最高金额 = 1 + 3 = 4 。

```java
package DynamicProgramming;
//打家劫舍
public class LC198 {
    public int rob(int[] nums) {
        if (nums.length==0) return 0;
        if (nums.length==1) return nums[0];
        int[] dp = new int[nums.length + 1];
        dp[0] = nums[0];
        dp[1] = Math.max(dp[0], nums[1]);
        for (int i = 2; i < nums.length; i++) {
            dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
        }
        return dp[nums.length - 1];
    }
}
```

### 打家劫舍II	LC213

你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警 。给定一个代表每个房屋存放金额的非负整数数组，计算你 在不触动警报装置的情况下 ，能够偷窃到的最高金额。

- 示例 1：输入：nums = [2,3,2] 输出：3 解释：你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。
- 示例 2： 输入：nums = [1,2,3,1] 输出：4 解释：你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。偷窃到的最高金额 = 1 + 3 = 4 。

```java
//打家劫舍II
public class LC213 {
    public int rob(int[] nums) {
        if (nums.length==0) return 0;
        if (nums.length == 1) return nums[0];
        if (nums.length == 2) {
            return Math.max(nums[0], nums[1]);
        }
        return Math.max(robLine(nums, 0, nums.length - 2), robLine(nums, 1, nums.length - 1));
    }

    private int robLine(int[] nums, int head, int tail) {
        /*if (head == tail) { return nums[head]; }
        int[] dp = new int[nums.length];
        dp[head] = nums[head];
        dp[head + 1] = Math.max(nums[head + 1], dp[head]);
        for (int i = head + 2; i <= tail; i++) {
            dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
        }
        return dp[tail];*/

        int d0 = nums[head], d1 = Math.max(nums[head + 1], d0);
        for (int i = head+2; i <= tail; i++) {
            int tmp = d1;
            d1 = Math.max(d1, d0 + nums[i]);
            d0 = tmp;
        }
        return d1;
    }
}
```

### 打家劫舍III	LC337

在上次打劫完一条街道之后和一圈房屋后，小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为“根”。 除了“根”之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 如果两个直接相连的房子在同一天晚上被打劫，房屋将自动报警。计算在不触动警报的情况下，小偷一晚能够盗取的最高金额。

输入: [3,2,3,null,3,null,1]

      3
     / \
    2   3
     \   \ 
      3   1
    输出: 7 
    解释: 小偷一晚能够盗取的最高金额 = 3 + 3 + 1 = 7.
  ```java
//打家劫舍III
//树形结构
public class LC337 {
    //直接递归---------------------------------------------------------------------------
    public int rob1(TreeNode root) {
        if (root == null) return 0;
        int res = root.val;
        //抢了该节点则叶节点不抢，直接去判断叶节点的叶节点
        if (root.left != null) {
            res += rob1(root.left.left) + rob1(root.left.right);
        }
        if (root.right != null) {
            res += rob1(root.right.left) + rob1(root.right.right);
        }
        return Math.max(res, rob1(root.left) + rob1(root.right));
    }
    //记忆递归----------------------------------------------------------------------------
    public int rob2(TreeNode root) {
        Map<TreeNode, Integer> map = new HashMap<>();
        return rob2action(root, map);
    }
    private int rob2action(TreeNode root, Map<TreeNode, Integer> map) {
        if (root == null) return 0;
        if (map.containsKey(root)) return map.get(root);
        int res = root.val;
        //抢了该节点则叶节点不抢，直接去判断叶节点的叶节点
        if (root.left != null) {
            res += rob2action(root.left.left, map) + rob2action(root.left.right, map);
        }
        if (root.right != null) {
            res += rob2action(root.right.left, map) + rob2action(root.right.right, map);
        }
        res = Math.max(res, rob2action(root.left, map) + rob2action(root.right, map));
        map.put(root, res);
        return res;
    }
    //状态递归-------------------------------------------------------------------------------------
    // 不偷：Max(左孩子不偷，左孩子偷) + Max(右孩子不偷，右孩子偷)
    // res[0] = Math.max(rob(root.left)[0], rob(root.left)[1]) +
    // Math.max(rob(root.right)[0], rob(root.right)[1])
    // 偷：左孩子不偷+ 右孩子不偷 + 当前节点偷
    // root[1] = rob(root.left)[0] + rob(root.right)[0] + root.val;
    public int rob3(TreeNode root) {
        Map<TreeNode, int[]> map = new HashMap<>();
        int[] res = rob3action(root, map);
        //res[0]记录该节点不偷时候的返回值，res[1]记录该节点偷的时候的返回值
        return Math.max(res[0], res[1]);
    }
    private int[] rob3action(TreeNode root,Map<TreeNode, int[]> map) {
        int[] res = new int[2];
        if (root == null) { return res; }
        if (map.containsKey(root)) {
            return map.get(root);
        }
        int[] left = rob3action(root.left,map);
        int[] right = rob3action(root.right,map);
        //根节点不偷
        res[0] = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
        //根节点偷
        res[1] = root.val + left[0] + right[0];
        map.put(root, res);
        return res;
    }
}
class TreeNode {
      int val;
      TreeNode left;
      TreeNode right;
      TreeNode() {}
      TreeNode(int val) { this.val = val; }
      TreeNode(int val, TreeNode left, TreeNode right) {
          this.val = val;
          this.left = left;
          this.right = right;
      }
}
  ```





# DFS

深度优先查找适合于查找一个区域的联通情况，因而很适合处理一个矩阵中的联通数、可达路径数的判断。

例题：OJ：396、397、536、404、405

## 技巧概括

1、创建全局的一个方向数组 dir 用于变了该节点的各个方向，按照题目需求来设计

2、dfs关注每次搜寻后需要进行什么动作

3、关注边界问题

## 1、01迷宫

OJ405题目描述

 有一个仅由数字 0 与 1 组成的 n×m 格迷宫。若你位于一格 0 上，那么你可以移动到相邻 4 格中的某一格 1上，同样若你位于一格 1 上，那么你可以移动到相邻 4 格中的某一格 0 上。 你的任务是：对于给定的迷宫，询问 k 次从某一格开始能移动到多少个格子（包含自身）。

ps：通过栈来把握是否更新res

```java
package GoodTrain;
import java.util.Arrays;
import java.util.Stack;
public class OJ405_hetter_stack {
    static int[][] dir = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    static int res = 1;
    static Stack<String> stack = new Stack<>();
    public static void main(String[] args) {
        int[][] matrix = {{0, 1, 1},
                          {1, 0, 0}};
        int n = matrix.length;
        int m = matrix[0].length;
        int[] x = {1, 2, 1, 2};
        int[] y = {1, 2, 3, 3};
        int[][] used = new int[n][m];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (used[i][j] == 0) {
                    res = 1;
                    dfs3(i, j, matrix,used);
                    System.out.println(stack.size());
                    while (!stack.isEmpty()) {
                        String[] s = stack.pop().split(",");
                        int xi = Integer.parseInt(s[0]);
                        int yi = Integer.parseInt(s[1]);
                        used[xi][yi] = res;
                    }
                }
            }
        }
        for (int i = 0; i < n; i++) {
            System.out.println(Arrays.toString(used[i]));
        }
        for (int i = 0; i < x.length; i++) {
            System.out.println(used[x[i] - 1][y[i] - 1]);
        }
    }

    private static void dfs3(int x, int y, int[][] matrix, int[][] used) {
        used[x][y] = 1;
        stack.push(x + "," + y);
        for (int i = 0; i < 4; i++) {
            int xx = x + dir[i][0];
            int yy = y + dir[i][1];
            if (xx >= 0 && xx < matrix.length && yy >= 0 && yy < matrix[0].length && used[xx][yy] == 0) {
                if (matrix[xx][yy] != matrix[x][y]) {
                    res++;
                    dfs3(xx, yy, matrix, used);
                }
            }
        }
    }
}

```

## 2、填涂颜色

OJ396 题目描述

 由数字 00 组成的方阵中，有一任意形状闭合圈，闭合圈由数字 11 构成。现要求把闭合圈内的所有空间都填写成 22。例如：6×66×6 的方阵 （n=6）（n=6），涂色前和涂色后的方阵如下：

```
0 0 0 0 0 0
0 0 1 1 1 1
0 1 1 0 0 1
1 1 0 0 0 1
1 0 0 0 0 1
1 1 1 1 1 1

0 0 0 0 0 0
0 0 1 1 1 1
0 1 1 2 2 1
1 1 2 2 2 1
1 2 2 2 2 1
1 1 1 1 1 1
```

ps: 思路就是在最外面包裹一圈0，从最外圈开始依次深度遍历，若有封闭空间，则封闭空间不会被dfs到，从而存在，而外层的0则置为2，如此一来，最外层变为2，被1包裹的0仍为0，然后对原矩阵中这些对应的没被搜寻到的0赋值为2即可

```java
package GoodTrain;
import java.util.Arrays;
public class OJ396_dfs {
    static int[][] dir = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    static int tmp;
    static int ans = 0;
    public static void main(String[] args) {
        int[][] matrix = {{0, 0, 0, 0, 0, 0},
                          {0, 0, 1, 1, 1, 1},
                          {0, 1, 1, 0, 0, 1},
                          {1, 1, 0, 0, 0, 1},
                          {1, 0, 0, 0, 0, 1},
                          {1, 1, 1, 1, 1, 1}};
        int n = matrix.length;
        int m = matrix[0].length;
        int[][] dp = new int[n + 2][m + 2];
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                dp[i][j] = matrix[i - 1][j - 1];
            }
        }
        //包裹一圈0
        int[][] used = new int[n + 2][m + 2];
        dfs4(0, 0, dp, used);

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                matrix[i-1][j-1]=(dp[i][j]==0)?2:matrix[i-1][j-1];
            }
        }
        for (int i = 0; i < n; i++) {
            System.out.println(Arrays.toString(matrix[i]));
        }

    }

    private static void dfs4(int x, int y, int[][] dp, int[][] used) {
        used[x][y] = 1;
        dp[x][y] = 2;
        for (int i = 0; i < 4; i++) {
            int xx = x + dir[i][0];
            int yy = y + dir[i][1];
            if (xx >= 0 && xx < dp.length && yy >= 0 && yy < dp[0].length && used[xx][yy] == 0) {
                if (dp[xx][yy] == 0) {
                    dfs4(xx, yy, dp, used);
                }
            }
        }
    }
}
```

## 3、连通区域个数

```java
package GoodTrain;
//计算非零数字连通区域个数
public class OJ397 {
    static int[][] dir = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    static int tmp;
    public static void main(String[] args) {
        int[][] matrix = {{0, 1, 2, 3, 4, 0},
                          {1, 0, 0, 0, 0, 0},
                          {2, 9, 3, 0, 2, 4},
                          {0, 0, 2, 0, 2, 8},
                          {1, 0, 0, 0, 0, 0}};
        int n = matrix.length;
        int m = matrix[0].length;
        int[][] dp = new int[n + 2][m + 2];
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                dp[i][j] = matrix[i - 1][j - 1];
            }
        }
        //能进入一次dfs就算有一个连通区域，在dfs过程中将便遍历的都置0就不会再次进入了
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (dp[i][j] != 0) {
                    dp[i][j] = 0;
                    tmp ++;
                    dfs1(i, j, dp);
                }
            }
        }
        System.out.println(tmp);
    }
    public static void dfs1(int x, int y, int[][] matrix) {
        for (int i = 0; i < 4; i++) {
            int xx = x + dir[i][0];
            int yy = y + dir[i][1];
            if (matrix[xx][yy] != 0) {
                matrix[xx][yy] = 0;
                dfs1(xx, yy, matrix);
            }
        }
    }
}
```

## 4、最大黑色区域

**动态规划**

```java
import java.util.Arrays;
public class OJ536 {
    public static void main(String[] args) {
        int[][] matrix = {{0, 1, 1, 0, 0, 1},
                          {1, 1, 0, 1, 0, 1},
                          {0, 1, 0, 0, 1, 0},
                          {0, 0, 0, 1, 1, 1},
                          {1, 0, 1, 1, 1, 0}};
        int n = matrix.length;
        int m = matrix[0].length;
        int[][] dp = new int[n ][m];
        for (int i = 1; i < m-1; i++) { dp[0][i] = matrix[0][i] + matrix[0][i - 1] + matrix[0][i + 1]; }
        for (int i = 1; i < n-1; i++) { dp[i][0] = matrix[i][0] + matrix[i - 1][0] + matrix[i + 1][0]; }
        dp[0][m-1] = matrix[0][m-1] + matrix[0][m - 2];
        dp[n-1][0] = matrix[n-1][0] + matrix[n - 2][0];
        int res = 0;
        for (int i = 1; i < n; i++) {
            for (int j = 1; j < m; j++) {
                if (matrix[i][j] == 1) {
                    dp[i][j] = matrix[i][j] + dp[i - 1][j] + dp[i][j - 1];
                    res = Math.max(res, dp[i][j]);
                }
            }
        }
        for (int i = 0; i < n; i++) {	 System.out.println(Arrays.toString(dp[i])); }
        System.out.println("最大连通区域面积： " + res);
    }
}
```

**DFS**

```java
package GoodTrain;
//深度搜索遍历寻找最大连通区域
public class OJ536_dfs {
    static int[][] dir = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    static int tmp;
    static int ans = 0;
    public static void main(String[] args) {
        int[][] matrix = {{0, 1, 1, 0, 0, 1},
                {1, 1, 0, 1, 0, 1},
                {0, 1, 0, 0, 1, 0},
                {0, 0, 0, 1, 1, 1},
                {1, 0, 1, 1, 1, 0}};
        int n = matrix.length;
        int m = matrix[0].length;
        int[][] dp = new int[n + 2][m + 2];
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                dp[i][j] = matrix[i - 1][j - 1];
            }
        }
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (dp[i][j] == 1) {
                    dp[i][j] = 0;
                    tmp = 1;
                    dfs(i, j, dp);
                    ans = Math.max(ans, tmp);
                }
            }
        }
        System.out.println(ans);
    }
    public static void dfs(int x, int y, int[][] matrix) {
        for (int i = 0; i < 4; i++) {
            int xx = x + dir[i][0];	int yy = y + dir[i][1];
            if (matrix[xx][yy] == 1) {
                tmp++;
                matrix[xx][yy] = 0;
                dfs(xx, yy, matrix);
            }
        }
    }
}
```

# BFS

地图可达问题，往往采用BFS来搜寻能否到达

## 技巧概括

1、先创建一个全局的队列 Queue用于进行BFS的存取出入操作

2、构建一个方向矩阵dir，用于方向遍历

## 模板

1、构建一个类，往往是存储位置信息和步长：  class Posi

2、新建一个内容为Posi的队列Queue以及方向数组

3、对符合条件的节点入栈，每次取队列头上出栈，进行操作

4、要判断好边界和可通行性

```java
public class OJ304 {
    private static Queue<Posi> p = new LinkedList<>();
    private static int[][] dir = {{1, 2}, {1, -2}, {-1, 2}, {-1, -2}, {-2, -1}, {2, 1}, {-2, 1}, {2, -1}};
    public static void main(String[] args) {
        //..........构建地图、读取起点、终点等操作..........
        char[][] map = new char[n][m];
        System.out.println(bfs2(map, x1, y1));
    }

    private static int bfs2(char[][] map, int x1, int y1) {
        p.add(new Posi(x1, y1, 0));
        map[x1][y1] = '0';//如果地图是可以修改的，已访问就直接修改，若不可以则需要used数组接入标记
        Posi tmp = null;
        int x, y;
        while (!p.isEmpty()) {
            tmp = p.poll();//出栈
            for (int i = 0; i < 8; i++) {//变了方向
                x = tmp.x + dir[i][0];
                y = tmp.y + dir[i][1];
                if ((x >= 0 && x < map.length) && (y >= 0 && y < map[0].length)){
                    //判断边界和可行性
                    if (map[x][y] == '.') {
                        map[x][y] = '0';
                        p.offer(new Posi(x, y, tmp.step + 1));//offer 入队
                    } else if (map[x][y]=='H') {
                        return tmp.step + 1;
                    }
                }
            }
        }
        return -1;
    }

    private static class Posi {
        int x;
        int y;
        int step;
        public Posi() { }
        public Posi(int x, int y, int step) {
            this.x = x;
            this.y = y;
            this.step = step;
        }
    }
}
```

例题：OJ304、399
以304为例子

## 1、骑士风度的牛

#### 题目描述

 农民约翰有很多牛，他想交易其中一头被Don称为骑士的牛。这头牛有一个独一无二的超能力，在农场里像骑士一样地跳（就是我们熟悉的象棋中马的走法）。虽然这头神奇的牛不能跳到树上和石头上，但是它可以在牧场上随意跳，我们把牧场用一个x,y 的坐标图来表示。

 这头神奇的牛像其它牛一样喜欢吃草，给你一张地图，上面标注了骑士的开始位置，树、灌木、石头以及其它障碍的位置，除此之外还有一捆草。现在你的任务是，确定骑士要想吃到草，至少需要跳多少次。骑士的位置用 K 来标记，障碍的位置用 ∗ 来标记，草的位置用 H 来标记。

```java
package GoodTrain;

import java.util.LinkedList;
import java.util.Queue;

//骑士风度的牛
public class OJ304 {
    private static Queue<Posi> p = new LinkedList<>();
    private static int[][] dir = {{1, 2}, {1, -2}, {-1, 2}, {-1, -2}, {-2, -1}, {2, 1}, {-2, 1}, {2, -1}};
    public static void main(String[] args) {
        String[] str={".........." ,
                      "....*....." ,
                      ".........." ,
                      "...*.*...." ,
                      ".......*.." ,
                      "..*..*...H" ,
                      "*........." ,
                      "...*...*.." ,
                      ".K........" ,
                      "...*.....*" ,
                      "..*....*.."  };
        int n = str.length;
        int m = str[0].length();
        char[][] map = new char[n][m];
        for (int i = 0; i < n; i++) { map[i] = str[i].toCharArray(); }
        //找出初始位置
        int x1 = 0, y1 = 0;
        a:for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (map[i][j] == 'K') {
                    x1 = i;
                    y1 = j;
                    break a;
                }
            }
        }
        System.out.println(bfs2(map, x1, y1));
    }
    private static int bfs2(char[][] map, int x1, int y1) {
        p.add(new Posi(x1, y1, 0));
        map[x1][y1] = '0';
        Posi tmp = null;
        int x, y;
        while (!p.isEmpty()) {
            tmp = p.poll();
            for (int i = 0; i < 8; i++) {
                x = tmp.x + dir[i][0];
                y = tmp.y + dir[i][1];
                if ((x >= 0 && x < map.length) && (y >= 0 && y < map[0].length)){
                    if (map[x][y] == '.') {
                        map[x][y] = '0';
                        p.offer(new Posi(x, y, tmp.step + 1));
                    } else if (map[x][y]=='H') {
                        return tmp.step + 1;
                    }
                }
            }
        }
        return -1;
    }

    private static class Posi {
        int x;
        int y;
        int step;
        public Posi() { }
        public Posi(int x, int y, int step) {
            this.x = x;
            this.y = y;
            this.step = step;
        }
    }
}
```

## 2、小明吃饭

```java
package GoodTrain;
import java.util.LinkedList;
import java.util.Queue;
//小明吃饭
public class OJ399 {
    private static Queue<Posi> posis = new LinkedList<>();
    private static int[][] dir = {{0, -1}, {1, 0}, {0, 1}, {-1, 0}};
    public static void main(String[] args) {
        char[][] map = {{'2', '.', '.', '.', '.', '.'},
                        {'#', '#', '#', '.', '#', '.'},
                        {'.', '.', '.', '.', '#', '.'},
                        {'.', '.', '#', '#', '#', '.'},
                        {'.', '.', '.', '.', '3', '.'}};
        int x1 = 0, y1 = 0;
        int x2 = 4, y2 = 4;
        int[][] used = new int[5][6];
        System.out.println(bfs(map, used, x1, y1, x2, y2));
    }

    private static int bfs(char[][] map, int[][] used, int x1, int y1, int x2, int y2) {
        posis.add((new Posi(x1, y1, 0)));
        used[x1][y1] = 1;
        Posi cur = null;
        int x, y;
        while (!posis.isEmpty()) {
            cur = posis.poll();
            for (int i = 0; i < 4; i++) {
                x = cur.x + dir[i][0];
                y = cur.y + dir[i][1];
                if (inLimit(x, y, map) && used[x][y] == 0 && passable(x, y, map)) {
                    used[x][y] = 1;
                    if (x == x2 && y == y2) {
                        return cur.step + 1;
                    }
                    posis.offer(new Posi(x, y, cur.step + 1));
                }
            }
        }
        return -1;
    }

    private static boolean passable(int x, int y, char[][] map) { return (map[x][y] != '#'); }
    private static boolean inLimit(int x, int y, char[][] map) { return ((x >= 0 && x < map.length) && (y >= 0 && y < map[0].length)); }
    private static class Posi {
        int x;
        int y;
        int step;
	public Posi() {}
    public Posi(int x, int y, int step) {
            this.x = x;
            this.y = y;
            this.step = step;
        }
    }
}
```

## 3、机智的外卖员（华为7.7第三题）

外卖员小W每天在大原中运送外卖，大厦共层（0<L<=100000），当处于第N（0<NL）层核时，可以每分钟通过步行梯向上到达N+1
层，或向下到达N-1层，或者乘坐电梯到达2N层。给定当前小W所处的位置N，以及外卖配送的目的楼层M，请计算出小W送达的最短时间。

### BFS搜索，从M->N或者从N->M

N->M

```java
public class HW3july7 {
    static Queue<Integer> queue = new LinkedList<>();
    static Set<Integer> set = new HashSet<>();
    //模拟，从起点找目标
    static int bfs(int n, int m, int[] used) {
        queue.add(n);
        set.add(n);
        while (!queue.isEmpty()) {
            int tmp = queue.poll();  int step = used[tmp];
            System.out.println("floor:"+tmp+" "+"step:"+step);
            if (tmp == m) { break; }
            int a = tmp + 1; int b = tmp - 1; int c = tmp * 2;
            if (a < used.length && set.add(a)) {
                used[a] = step + 1;
                queue.offer(a);
            }
            if (b > 0 && set.add(b)) {
                used[b] = step + 1;
                queue.offer(b);
            }
            if (c < used.length && set.add(c)) {
                used[c] = step + 1;
                queue.offer(c);
            }
        }
        return used[m];

    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        System.out.println("出发楼层：" + n + "  " + "目标楼层" + m);
        int[] used = new int[2 * m];
        int res = bfs(n, m, used);
        System.out.println(res);
    }
}
```

M->N  较快

```java
public class help {
    static int[] used = new int[1000000];
    public static Queue<Integer> queue = new LinkedList<>();
    public static Set<Integer> set = new HashSet<>();
    public static void main(String[] args) {
        Arrays.fill(used, 0);
        System.out.println(bfs(198765,31));
        System.out.println(Arrays.toString(used).substring(0, 100));

    }

    public static int bfs( int m, int n) {
        queue.add(m);
        set.add(m);
        while (!queue.isEmpty()) {
            int tmppoint = queue.poll();
            int step = used[tmppoint];
            System.out.println("floor:"+tmppoint+" "+"step:"+step);
            if (tmppoint == n) { break; }

            if (tmppoint + 1 < used.length && set.add(tmppoint + 1)) {
                used[tmppoint + 1] = step + 1;
                queue.offer(tmppoint + 1);
            }
            if (tmppoint - 1 > 0 && set.add(tmppoint - 1)) {
                used[tmppoint - 1] = step + 1;
                queue.offer(tmppoint - 1);
            }
            if (tmppoint % 2 == 0 && set.add(tmppoint / 2)) {
                used[tmppoint / 2] = step + 1;
                queue.offer(tmppoint /2 );
            }
        }
        return used[n];
    }
}
```

### DFS实现⭐

思路：从上往下找起点，很明显最差方案是一步一步走楼梯，所以step每个状态更新为从m找到当前层的count加上n走到当前成的步数，递归去将这个要走的部分更新成可以坐电梯的部分，这样递归即可实现。

```java
public class HW3july7DFS1 {
    static int step = Integer.MAX_VALUE;
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        System.out.println("出发楼层：" + n + "  " + "目标楼层" + m);
        dfs(n, m, 0);
        System.out.println(step);
    }
    public static  void  dfs(int n, int m, int count){
        step = Math.min(step, Math.abs(n - m) + count);
        if (m <= n) {
            return;
        }
        if ((m & 1) == 0) {
            dfs2(n, m / 2, count + 1);
        } else {
            dfs2(n, m + 1, count + 1);
            dfs2(n, m - 1, count + 1);
        }
    }
}
```







国王游戏

```java
import com.sun.tools.javac.Main;
import java.math.BigInteger;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Scanner;
//国王游戏
public class OJ256 {
    Scanner sc = new Scanner(System.in);
    int n;
    Minister ministers[];
    public void input() {
        n = sc.nextInt();
        ministers = new Minister[n + 1 + 1];
        for (int i = 0; i < n + 1; i++) {
            ministers[i] = new Minister(sc.nextInt(), sc.nextInt());
        }
    }
    public void process() {
        Arrays.sort(ministers,1,n+1,new Comparator<Minister>(){
            @Override
            public int compare(Minister m1, Minister m2) {
                return (m1.getLeft() * m1.getRight() - m2.getLeft() * m2.getRight());
            }
        });
        BigInteger prev = new BigInteger(String.valueOf(ministers[0].getLeft()));
        BigInteger mx = BigInteger.ZERO;
        for (int i = 1; i <= n; i++) {
            if (prev.compareTo(new BigInteger(String.valueOf(ministers[i].getRight()))) < 0) {
                if (new BigInteger("1").compareTo(mx) > 0) {
                    mx = new BigInteger("1");
                }
            } else {
                BigInteger tmp = prev.divide(new BigInteger(String.valueOf(ministers[i].getRight())));
                if(tmp.compareTo(mx) > 0){
                    mx = tmp;
                }
            }
            prev = prev.multiply(new BigInteger(String.valueOf(ministers[i].getLeft())));
        }
        System.out.println(mx);
    }
    public static void main(String[] args) {
        OJ256 solve = new OJ256();
        solve.input();
        solve.process();
    }
}

class Minister {
    private int left;
    private int right;
    public Minister(int left, int right) {
        this.left = left;
        this.right = right;
    }
    public int getLeft() {
        return left;
    }
    public void setLeft(int left) {
        this.left = left;
    }
    public int getRight() {
        return right;
    }
    public void setRight(int right) {
        this.right = right;
    }
}
```



# 面试遇题

## 1、二进制中1的个数

```java
public class Solution {
    // you need to treat n as an unsigned value
    public int hammingWeight(int n) {
        int res = 0;
        // while(n!=0){//较好方法
        //     res++;
        //     n &= (n-1);
        // }
        while(n!=0){
            res+=n&1;
            n >> 1;
        }
        return res;
    }
}
```

## 2、判断一个数是否是2的幂次

```java
a  = (10000)b
a-1 = (01111)b
a&(a-1) = 0
    
public boolean isPowerOfTwo(int n) {
        return (n&(n-1))==0&&n>0;
}
```

## 3、最长无重复子串

滑动窗口：LC3、JZ48

```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        char[] chars=s.toCharArray();
        Map<Character, Integer> map = new HashMap<>();
        int i=0,j=0;
        int maxlen=0;
        for (; j < chars.length; j++) {
            if (map.containsKey(chars[j])) {
                i = Math.max(map.get(chars[j])+1,i);
            }
            maxlen = Math.max(j - i + 1, maxlen);
            map.put(chars[j], j);
        }
        return maxlen;
    }
}
```

## 4、容器盛水问题

给定一个整形数组arr，已知其中所有的值都是非负的，将这个数组看作一个容器，请返回容器能装多少水。

<img src="https://uploadfiles.nowcoder.com/images/20190501/310694_1556671662501_D22DB62CB4987A3034A70B60491932C3" alt="img" style="zoom:50%;" />

```java
public class NC3 {
    public static void main(String[] args) {
        int[] nums = {3, 1, 2, 5, 2, 1, 4};
        System.out.println(help(nums));
    }
    private static long help(int[] nums) {
        long res = 0;
        int left = 0, right = nums.length - 1;

        while (left < right) {
            int mark = Math.min(nums[left], nums[right]);
            if (nums[left] < nums[right]) {
                left++;
                if (nums[left] < mark) {
                    res += mark - nums[left];
                } else {
                    mark = Math.min(nums[left], nums[right]);
                }
            } else {
                right--;
                if (nums[right] < mark) {
                    res += mark - nums[right];
                } else {
                    mark = Math.min(nums[left], nums[right]);
                }
            }
            //简写方法：
           /* 
           while (r > l) {
           int tmp = Math.min(arr[r], arr[l]);  // 找到最小的边界 盛水由最小边界决定
           // 找完一个凹槽
           while (r > l && arr[l] <= tmp) { // 边界向中间缩 逐步寻找凹槽
               res += tmp - arr[l];
               l++;
           }
 
           // 开始找下一个凹槽
           while (r > l && arr[r] <= tmp) { // 边界向中间缩 逐步寻找凹槽
               res += tmp - arr[r];
               r--;
           }*/
       }
       return res;
        }
        return res;
    }
}
```

## 5、二维有序数组查找

```java
//二位有序数组查找
    public static boolean find(int[][] arr, int target) {
        int row = 0;
        int col = arr[0].length - 1;
        while (row <= arr.length - 1 && col >= 0) {
            if (target==arr[row][col]) return true;
            else if (target>arr[row][col]) row++;
            else col--;
        }
        return false;
    }
```

## 6、网络延迟时间 djikstra查找

```java
public class LC743 {
    public int networkDelayTime(int[][] times, int n, int k) {
        final int INF = Integer.MAX_VALUE / 2;//声明一个固定量
        //邻接矩阵存储边信息
        int[][] matrix = new int[n][n];
        for (int i = 0; i < n; i++) {
            Arrays.fill(matrix[i], INF);
        }
        for (int[] t : times) {
            //边序号从0开始
            int x = t[0] - 1, y = t[1] - 1;
            matrix[x][y] = t[2];
        }
        //从源点到某点的距离
        int[] dist = new int[n];
        Arrays.fill(dist, INF);
        //由于从k点开始，所以该点距离为0，即为源点
        dist[k - 1] = 0;
        //节点是否被更新数组
        boolean[] visit = new boolean[n];
        Arrays.fill(visit, false);//法拉瑟表示未访问，否则反之

        for (int i = 0; i < n; i++) {
            int x = -1;
            //在还未确定最短路的点中寻找里源点最近的点
            for (int y = 0; y < n; y++) {
                //第一次找到的就是源点 因为其距离为0
                if (!visit[y] && (x == -1 || dist[y] < dist[x])) {
                    x = y;
                }
            }
            //用该点更新其他所有的点 为走到的点还是INF距离
            visit[x] = true;
            for (int y = 0; y < n; y++) {
                dist[y] = Math.min(dist[y], dist[x] + matrix[x][y]);
            }
        }
        //找到距离最远的点
        int ans = Arrays.stream(dist).max().getAsInt();
        return ans == INF ? -1 : ans;
    }
}
```

## 7、版本号对比

```java
//牛客：版本号比较
public class NC1 {
    public static void main(String[] args) {
        String v1 = "1.2";String v2 = "1.1";
        System.out.println(compare(v1, v2));
    }
    public static int compare(String v1, String v2) {
        String[] s1 = v1.split("\\."); String[] s2 = v2.split("\\.");
        int i = 0;
        for (; i < Math.min(s1.length, s2.length); i++) {
            if (Integer.parseInt(s1[i]) == Integer.parseInt(s2[i])) {
                continue;
            }
            return Integer.parseInt(s1[i]) > Integer.parseInt(s2[i]) ? 1 : -1;
        }
        while (i < s1.length) {
            if (Integer.parseInt(s1[i]) > 0) { return 1; }	
            i++;
        }
        while (i < s2.length) {
            if (Integer.parseInt(s2[i]) > 0) { return -1; }
            i++;
        }
        return 0;
    }
}
```

## 8、图形打印 递归

```java
//图形打印
public class OJ240 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while (!sc.hasNext("-1")) {
            int a = sc.nextInt();
            int edge = (int) Math.pow(3, a - 1);
            String[][] matrix = new String[edge][edge];
            for (String[] strings : matrix) { Arrays.fill(strings, " "); }

            help(matrix, a, 0, 0);
//            for (String[] strings : matrix) { System.out.println(Arrays.toString(strings)); }
            for (String[] strings : matrix) {
                for (String s : strings) {
                    System.out.print(s);
                }
                System.out.println();
            }
        }
    }
    private static void help(String[][] matrix, int a, int x, int y) {
        if (a == 1) {
            matrix[x][y] = "x";
        } else {
            a--;
            int edge_new = (int) Math.pow(3, a - 1);
            for (int i = 0; i < 3; i++) {
                help(matrix, a, x + i * edge_new, y + i * edge_new);
            }
            help(matrix, a, x, y + 2 * edge_new);
            help(matrix, a, x + 2 * edge_new, y);
        }
    }
}
```

## 9、国王游戏  大数

```java
//国王游戏
public class OJ256 {
    Scanner sc = new Scanner(System.in);
    int n;
    Minister ministers[];
    public void input() {
        n = sc.nextInt();
        ministers = new Minister[n + 1 + 1];
        for (int i = 0; i < n + 1; i++) {
            ministers[i] = new Minister(sc.nextInt(), sc.nextInt());
        }
    }
    public void process() {
        Arrays.sort(ministers,1,n+1,new Comparator<Minister>(){
            @Override
            public int compare(Minister m1, Minister m2) {
//                return (m1.getLeft() * m1.getRight() - m2.getLeft() * m2.getRight());
                return (m1.getLeft() / m2.getRight() - m2.getLeft() / m1.getRight());
            }
        });
        BigInteger prev = new BigInteger(String.valueOf(ministers[0].getLeft()));
        BigInteger mx = BigInteger.ZERO;
        for (int i = 1; i <= n; i++) {
            if (prev.compareTo(new BigInteger(String.valueOf(ministers[i].getRight()))) < 0) {
                if (new BigInteger("1").compareTo(mx) > 0) {
                    mx = new BigInteger("1");
                }
            } else {
                BigInteger tmp = prev.divide(new BigInteger(String.valueOf(ministers[i].getRight())));
                if(tmp.compareTo(mx) > 0){
                    mx = tmp;
                }
            }
            prev = prev.multiply(new BigInteger(String.valueOf(ministers[i].getLeft())));
        }
        System.out.println(mx);
    }
    public static void main(String[] args) {
        OJ256 solve = new OJ256();
        solve.input();
        solve.process();
    }
}
class Minister {
    private int left;
    private int right;
    public Minister(int left, int right) {
        this.left = left;
        this.right = right;
    }
    public int getLeft() { return left; }
	public void setLeft(int left) { this.left = left; }
    public int getRight() { return right;}
    public void setRight(int right) {this.right = right;}
}
```

## 10、最大整数（字典序）

 现在有 nn 个正整数，将他们连成一排，组成一个最大的整数。

 例如，现在有三个整数 13,312,343，连接成最大整数为 34331213。

```java
import java.util.Arrays;
import java.util.Comparator;
import java.util.stream.IntStream;
import java.util.stream.Stream;
// 现在有 n 个正整数，将他们连成一排，组成一个最大的整数。
// 例如，现在有三个整数 13,312,343，连接成最大整数为 34331213。
public class OJ505 {
    public static void main(String[] args) {
//          int[] nums = {121, 12, 86};
        Integer[] nums = {121, 12, 86};
//        IntStream stream = Arrays.stream(nums);
////流中的元素全部装箱，转换为流 ---->int转为Integer
//        Stream<Integer> integerStream = stream.boxed();
//        Integer[] integers = integerStream.toArray(Integer[]::new);
        Arrays.sort(nums, new Comparator<Integer>() {
            public int compare(Integer o1, Integer o2) {
                String s1 = String.valueOf(o1) + String.valueOf(o2);
                String s2 = String.valueOf(o2) + String.valueOf(o1);
//                return s2.compareTo(s1);
                return Integer.parseInt(s2) - Integer.parseInt(s1);
            }
        });
        System.out.println(Arrays.toString(nums));
        StringBuilder res = new StringBuilder();
        for (int i : nums) {	res.append(String.valueOf(i));	}
        System.out.println(res.toString());
    }
}
```

## 11、牛奶碑文

 约翰和他的奶牛在大草原漫游，在一块石头上发现了一些有趣的碑文。碑文似乎是一个神秘古老的语言，只包括三个大写字母 C,O,W。尽管约翰看不懂，但是令他高兴的是，C,O,W 的顺序形式构成了一句他最喜欢的奶牛单词 “COW”。现在，他想知道有多少次 COW 出现在文本中。如果 COW 内穿插了其他字符，只要 COW 字符出现在正确的顺序，约翰也不介意。甚至，他也不介意出现不同的 COWCOW 共享一些字母。例如，CWOW出现了 1 次 COW，CCOW 算出现了 2 次 COW，CCOOWW 算出现了 8 次 COW。

```java
import com.sun.jdi.PathSearchingVirtualMachine;
//奶牛碑文
public class OJ516 {
    public static void main(String[] args) {
        String s = "COOWW";
        char[] c = s.toCharArray();
        int n = s.length();
        Integer[] countC = new Integer[n];
        countC[0] = (c[0] == 'C') ? 1 : 0;
        Integer[] countW = new Integer[n];
        countW[n-1] = (c[n-1] == 'W') ? 1 : 0;
        //正序算C
        for (int i = 1; i < n; i++) {
            if (c[i] == 'C') {	countC[i] = countC[i - 1] + 1;	} 
            else {	countC[i] = countC[i - 1];	}
        }
        //倒序算W
        for (int i = n - 2; i >= 0; i--) {
            if (c[i] == 'W') {	countW[i] = countW[i + 1] + 1;	} 
            else {	countW[i] = countW[i + 1];	}
        }
        //遍历O
        int res = 0;
        for (int i = 0; i < n; i++) {
            if (c[i] == 'O') {	res += countC[i] * countW[i];	}
        }
        System.out.println(res);
    }
}
```

## 12、01无序序列中连续1的最长长度

```java
import java.util.ArrayList;
import java.util.List;
public class TP_1_slidwindow {
    public static void main(String[] args) {
        String s = "01001110011010101";
        int k = 3;
        int left = 0, right = -1, count = 0;
        while (count <= k) { if (s.charAt(++right)=='0') count++; }//结束时再第k+1个0的位置
        int max_length = right - left;
        System.out.println(max_length);
        while (right < s.length()) {
//            while (left < s.length() && s.charAt(left++) == '1') { }//就是对left做加1操作，直到left指向下一个0
            while (left < s.length()) {
                if (s.charAt(left) == '0') {
                    left++;
                    break;
                } else { left++;}
            }
//            while (++right < s.length() && s.charAt(right) == '1') { }//对right做加1操作，知道right指向下一个0
            right++;
            while (right < s.length()) {
                if (s.charAt(right) == '0') { break;} 
                else { right++;}
            }
            max_length = Math.max(max_length, right - left);
        }
        System.out.println(max_length);
    }
}
```

## 13、访问所有节点的最短路径

**状态压缩 + 广度优先搜索**

**思路与算法**

由于题目需要我们求出「访问所有节点的**最短路径**的长度」，并且图中每一条边的长度均为 11，因此我们可以考虑使用广度优先搜索的方法求出最短路径。在常规的广度优先搜索中，我们会在队列中存储节点的编号。对于本题而言，最短路径的前提是「访问了所有节点」，因此除了记录节点的编号以外，我们还需要记录每一个节点的经过情况。因此，我们使用三元组 (u, \textit{mask}, \textit{dist})(*u*,*mask*,*dist*) 表示队列中的每一个元素，其中：

- *u* 表示当前位于的节点编号；
- *mask* 是一个长度为 n*n* 的二进制数，表示每一个节点是否经过。如果 \textit{mask}*mask* 的第 i*i* 位是 11，则表示节点 i*i* 已经过，否则表示节点 i*i* 未经过；
- *dist* 表示到当前节点为止经过的路径长度。

这样一来，我们使用该三元组进行广度优先搜索，即可解决本题。初始时，我们将所有的 (i, 2^i, 0)(*i*,2*i*,0) 放入队列，表示可以从任一节点开始。在搜索的过程中，如果当前三元组中的 \textit{mask}*mask* 包含 n*n* 个 11（即 \textit{mask} = 2^n - 1*mask*=2*n*−1），那么我们就可以返回 \textit{dist}*dist* 作为答案。

**细节**

为了保证广度优先搜索时间复杂度的正确性，即同一个节点 *u* 以及节点的经过情况 mask 只被搜索到一次，我们可以使用数组或者哈希表记录(*u*,*mask*) 是否已经被搜索过，防止无效的重复搜索。

```java
public class LC847_correct {
    public int shortestPathLength(int[][] graph) {
        int n = graph.length;
        Queue<int[]> queue = new LinkedList<int[]>();
        boolean used[][] = new boolean[n][1 << n];//1<<n  即为2的n次 也即为1向左移位n
        for (int i = 0; i < n; i++) {
            queue.offer(new int[]{i, 1 << i, 0});
            used[i][1 << i] = true;
        }
        int ans = 0;
        while (!queue.isEmpty()) {
            int[] tmp = queue.poll();
            int u = tmp[0], mask = tmp[1], dist = tmp[2];
            if (mask == (1 << n) - 1) {
                ans = dist;
                break;
            }
            //搜索相邻的节点
            for (int v : graph[u]) {
                int maskV = mask | (1 << v);//或操作
                if (!used[v][maskV]) {
                    queue.offer(new int[]{v, maskV, dist + 1});
                    used[v][maskV] = true;
                }
            }
        }
        return ans;
    }
}
```

## 14、寻找两个正序数组的中位数

给定两个大小分别为 `m` 和 `n` 的正序（从小到大）数组 `nums1` 和 `nums2`。请你找出并返回这两个正序数组的 **中位数** 。

```java
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int m = nums1.length;
        int n = nums2.length;
        int len = m + n;
        int index = 0;
        int x = len / 2 - 1;
        int y = x + 1;
        int[] fixednums = new int[m + n];
        int i = 0, j = 0;
        while (i < m && j < n) {
            if (nums1[i] <= nums2[j]) { fixednums[index] = nums1[i]; i++; } 
            else { fixednums[index] = nums2[j]; j++; }
            index++;
        }
        if (i == m) {
            while (j++ < n) { fixednums[index++] = nums2[j-1]; }
        }
        if (j == n) {
            while (i++ < m) { fixednums[index++] = nums1[i-1];  }
        }
        double res = 0;
        if ((len & 1) == 1) {    res = (double) fixednums[y];   } 
        else {    res = (double) (fixednums[x] + fixednums[y]) / 2;    }
        return res;
    }
}
```

## 15、盛最多水的容器

给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

更新较小一边的边界，因为更新较大一边的边界，只有在新的边界比上一次的值小才会更新，所以就是会往小了更新，而较小值边界进行更新也许可以提升这个高度。

```java
public class LC11 {
    public int maxArea(int[] height) {
        int n = height.length;
        int left = 0, right = n - 1;
        int res = 0;
        while (left < right) {
            res = Math.max(haveWater(height, left, right), res);
            if (height[left] < height[right]) { left++;}
            else{ right--; }
        }
        return res;
    }
    public int haveWater(int[] height, int left, int right) {
        return Math.min(height[left], height[right]) * (right - left);
    }
}
```

## 16、等差数列划分 II - 子序列

给你一个整数数组 nums ，返回 nums 中所有 等差子序列 的数目。如果一个序列中 至少有三个元素 ，并且任意两个相邻元素之差相同，则称该序列为等差序列。

例如，[1, 3, 5, 7, 9]、[7, 7, 7, 7] 和 [3, -1, -5, -9] 都是等差序列。
再例如，[1, 1, 2, 5, 7] 不是等差序列。
数组中的子序列是从数组中删除一些元素（也可能不删除）得到的一个序列。

例如，[2,5,10] 是 [1,2,1,2,4,1,5,10] 的一个子序列。
题目数据保证答案是一个 32-bit 整数。

```java
class Solution {
    public int numberOfArithmeticSlices(int[] nums) {
        int ans = 0; int n = nums.length;
        Map<Long, Integer>[] maps = new Map[n];
        for (int i = 0; i < n; ++i) { maps[i] = new HashMap<Long, Integer>(); }
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < i; ++j) {
                long d = 1L * nums[i] - nums[j];
                int cnt = (int) maps[j].getOrDefault(d, 0);
                ans += cnt;
                maps[i].put((d), (int)maps[i].getOrDefault(d, 0) + cnt + 1);
            }
        }
        return ans;
    }
}
```

## 17、LRU缓存

```java
public class LRUCache {
        class DLinkedNode {
            int key;
            int value;
            DLinkedNode prev;
            DLinkedNode next;
            public DLinkedNode() {}
            public DLinkedNode(int _key, int _value) {key = _key; value = _value;}
        }

        private Map<Integer, DLinkedNode> cache = new HashMap<Integer, DLinkedNode>();
        private int size;
        private int capacity;
        private DLinkedNode head, tail;

        public LRUCache(int capacity) {
            this.size = 0;
            this.capacity = capacity;
            // 使用伪头部和伪尾部节点
            head = new DLinkedNode();
            tail = new DLinkedNode();
            head.next = tail;
            tail.prev = head;
        }

        public int get(int key) {
            DLinkedNode node = cache.get(key);
            if (node == null) {
                return -1;
            }
            // 如果 key 存在，先通过哈希表定位，再移到头部
            moveToHead(node);
            return node.value;
        }

        public void put(int key, int value) {
            DLinkedNode node = cache.get(key);
            if (node == null) {
                // 如果 key 不存在，创建一个新的节点
                DLinkedNode newNode = new DLinkedNode(key, value);
                // 添加进哈希表
                cache.put(key, newNode);
                // 添加至双向链表的头部
                addToHead(newNode);
                ++size;
                if (size > capacity) {
                    // 如果超出容量，删除双向链表的尾部节点
                    DLinkedNode tail = removeTail();
                    // 删除哈希表中对应的项
                    cache.remove(tail.key);
                    --size;
                }
            }
            else {
                // 如果 key 存在，先通过哈希表定位，再修改 value，并移到头部
                node.value = value;
                moveToHead(node);
            }
        }

        private void addToHead(DLinkedNode node) {
            node.prev = head;
            node.next = head.next;
            head.next.prev = node;
            head.next = node;
        }

        private void removeNode(DLinkedNode node) {
            node.prev.next = node.next;
            node.next.prev = node.prev;
        }

        private void moveToHead(DLinkedNode node) {
            removeNode(node);
            addToHead(node);
        }

        private DLinkedNode removeTail() {
            DLinkedNode res = tail.prev;
            removeNode(res);
            return res;
        }
    }
```









