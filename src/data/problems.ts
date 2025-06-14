export interface TestCase {
  id: number;
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  passed?: boolean;
  hidden?: boolean;
}

export interface Problem {
  id: number;
  number: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  solved: boolean;
  likes: number;
  time: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  testCases: TestCase[];
  starterCode: {
    python: string;
    javascript: string;
    cpp: string;
    java: string;
  };
  hints: string[];
}

export const problems: Problem[] = [
  {
    id: 1,
    number: 1,
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Array",
    solved: false,
    likes: 1234,
    time: "15 min",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices* of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the *same* element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10⁴",
      "-10⁹ <= nums[i] <= 10⁹",
      "-10⁹ <= target <= 10⁹",
      "Only one valid answer exists.",
    ],
    testCases: [
      { id: 1, input: "[2,7,11,15], 9", expectedOutput: "[0,1]" },
      { id: 2, input: "[3,2,4], 6", expectedOutput: "[1,2]" },
      { id: 3, input: "[3,3], 6", expectedOutput: "[0,1]" },
      { id: 4, input: "[1,2,3,4,5], 9", expectedOutput: "[3,4]", hidden: true },
      {
        id: 5,
        input: "[-1,-2,-3,-4,-5], -8",
        expectedOutput: "[2,4]",
        hidden: true,
      },
    ],
    starterCode: {
      python: `def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Your code here
    pass`,
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Your code here
};`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
    }
};`,
      java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
    }
}`,
    },
    hints: [
      "Try using a hash map to store the numbers you've seen so far.",
      "For each number, check if its complement (target - current number) exists in the hash map.",
      "Don't forget to store the index along with the number in your hash map.",
    ],
  },
  {
    id: 2,
    number: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    topic: "Linked List",
    solved: false,
    likes: 987,
    time: "25 min",
    description: `You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807.",
      },
      {
        input: "l1 = [0], l2 = [0]",
        output: "[0]",
      },
      {
        input: "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]",
        output: "[8,9,9,9,0,0,0,1]",
      },
    ],
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100].",
      "0 <= Node.val <= 9",
      "It is guaranteed that the list represents a number that does not have leading zeros.",
    ],
    testCases: [
      { id: 1, input: "[2,4,3], [5,6,4]", expectedOutput: "[7,0,8]" },
      { id: 2, input: "[0], [0]", expectedOutput: "[0]" },
      {
        id: 3,
        input: "[9,9,9,9,9,9,9], [9,9,9,9]",
        expectedOutput: "[8,9,9,9,0,0,0,1]",
      },
      { id: 4, input: "[1,8], [0]", expectedOutput: "[1,8]", hidden: true },
      {
        id: 5,
        input: "[5], [5]",
        expectedOutput: "[0,1]",
        hidden: true,
      },
    ],
    starterCode: {
      python: `# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def addTwoNumbers(l1, l2):
    """
    :type l1: ListNode
    :type l2: ListNode
    :rtype: ListNode
    """
    # Your code here
    pass`,
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    // Your code here
};`,
      cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        // Your code here
    }
};`,
      java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        // Your code here
    }
}`,
    },
    hints: [
      "Keep track of the carry value during addition.",
      "Remember to handle cases where one list is longer than the other.",
      "Don't forget to add a final node if there's a carry at the end.",
    ],
  },
  {
    id: 3,
    number: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    topic: "String",
    solved: true,
    likes: 2156,
    time: "20 min",
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: 'The answer is "b", with the length of 1.',
      },
      {
        input: 's = "pwwkew"',
        output: "3",
        explanation: 'The answer is "wke", with the length of 3.',
      },
    ],
    constraints: [
      "0 <= s.length <= 5 * 10⁴",
      "s consists of English letters, digits, symbols and spaces.",
    ],
    testCases: [
      { id: 1, input: '"abcabcbb"', expectedOutput: "3" },
      { id: 2, input: '"bbbbb"', expectedOutput: "1" },
      { id: 3, input: '"pwwkew"', expectedOutput: "3" },
      { id: 4, input: '""', expectedOutput: "0", hidden: true },
      { id: 5, input: '"dvdf"', expectedOutput: "3", hidden: true },
    ],
    starterCode: {
      python: `def lengthOfLongestSubstring(s):
    """
    :type s: str
    :rtype: int
    """
    # Your code here
    pass`,
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    // Your code here
};`,
      cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Your code here
    }
}`,
    },
    hints: [
      "Use the sliding window technique with two pointers.",
      "Keep track of characters in the current window using a hash set or hash map.",
      "When you find a repeating character, move the left pointer to eliminate duplicates.",
    ],
  },
  {
    id: 4,
    number: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    topic: "Binary Search",
    solved: false,
    likes: 543,
    time: "45 min",
    description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return **the median** of the two sorted arrays.

The overall run time complexity should be \`O(log (m+n))\`.`,
    examples: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.00000",
        explanation: "merged array = [1,2,3] and median is 2.",
      },
      {
        input: "nums1 = [1,2], nums2 = [3,4]",
        output: "2.50000",
        explanation:
          "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.",
      },
    ],
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000",
      "-10⁶ <= nums1[i], nums2[i] <= 10⁶",
    ],
    testCases: [
      { id: 1, input: "[1,3], [2]", expectedOutput: "2.00000" },
      { id: 2, input: "[1,2], [3,4]", expectedOutput: "2.50000" },
      { id: 3, input: "[], [1]", expectedOutput: "1.00000", hidden: true },
      { id: 4, input: "[2], []", expectedOutput: "2.00000", hidden: true },
    ],
    starterCode: {
      python: `def findMedianSortedArrays(nums1, nums2):
    """
    :type nums1: List[int]
    :type nums2: List[int]
    :rtype: float
    """
    # Your code here
    pass`,
      javascript: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    // Your code here
};`,
      cpp: `class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        // Your code here
    }
};`,
      java: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Your code here
    }
}`,
    },
    hints: [
      "Use binary search to find the correct partition point.",
      "Ensure the total elements on the left side equals those on the right (or differs by 1).",
      "Make sure all elements on the left are less than or equal to all elements on the right.",
    ],
  },
  {
    id: 5,
    number: 5,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    topic: "String",
    solved: false,
    likes: 1876,
    time: "30 min",
    description: `Given a string \`s\`, return *the longest palindromic substring* in \`s\`.`,
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
        explanation: '"aba" is also a valid answer.',
      },
      {
        input: 's = "cbbd"',
        output: '"bb"',
      },
    ],
    constraints: [
      "1 <= s.length <= 1000",
      "s consist of only digits and English letters.",
    ],
    testCases: [
      { id: 1, input: '"babad"', expectedOutput: '"bab"' },
      { id: 2, input: '"cbbd"', expectedOutput: '"bb"' },
      { id: 3, input: '"a"', expectedOutput: '"a"', hidden: true },
      { id: 4, input: '"ac"', expectedOutput: '"a"', hidden: true },
    ],
    starterCode: {
      python: `def longestPalindrome(s):
    """
    :type s: str
    :rtype: str
    """
    # Your code here
    pass`,
      javascript: `/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    // Your code here
};`,
      cpp: `class Solution {
public:
    string longestPalindrome(string s) {
        // Your code here
    }
};`,
      java: `class Solution {
    public String longestPalindrome(String s) {
        // Your code here
    }
}`,
    },
    hints: [
      "Try the expand around centers approach.",
      "For each character, try expanding both odd and even length palindromes.",
      "Keep track of the longest palindrome found so far.",
    ],
  },
  {
    id: 6,
    number: 11,
    title: "Container With Most Water",
    difficulty: "Medium",
    topic: "Two Pointers",
    solved: true,
    likes: 1345,
    time: "20 min",
    description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i\`th line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return *the maximum amount of water a container can store*.

**Notice** that you may not slant the container.`,
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation:
          "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.",
      },
      {
        input: "height = [1,1]",
        output: "1",
      },
    ],
    constraints: [
      "n == height.length",
      "2 <= n <= 10⁵",
      "0 <= height[i] <= 10⁴",
    ],
    testCases: [
      { id: 1, input: "[1,8,6,2,5,4,8,3,7]", expectedOutput: "49" },
      { id: 2, input: "[1,1]", expectedOutput: "1" },
      { id: 3, input: "[4,3,2,1,4]", expectedOutput: "16", hidden: true },
      { id: 4, input: "[1,2,1]", expectedOutput: "2", hidden: true },
    ],
    starterCode: {
      python: `def maxArea(height):
    """
    :type height: List[int]
    :rtype: int
    """
    # Your code here
    pass`,
      javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    // Your code here
};`,
      cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int maxArea(int[] height) {
        // Your code here
    }
}`,
    },
    hints: [
      "Use two pointers starting from both ends of the array.",
      "Always move the pointer with the smaller height inward.",
      "Keep track of the maximum area found so far.",
    ],
  },
];

export const getProblemById = (id: number): Problem | undefined => {
  return problems.find((problem) => problem.id === id);
};
