export class FrequencyUtils {
    /**
     * PATTERN 1: FREQUENCY COUNTER
     * Determines if string 'b' is an anagram of string 'a'.
     * An anagram is a word formed by rearranging the letters of another (e.g., "cinema" -> "iceman").
     * * Time Complexity: O(N)
     * Why faster? Sorting both strings would be O(N log N). This is linear.
     */
    static validAnagram(str1: string, str2: string): boolean {
        // Optimization: If lengths differ, they can't be anagrams.
        if (str1.length !== str2.length) return false;

        // We use a Map to store { character: count }
        // Key = Char, Value = Frequency
        const lookup = new Map<string, number>();

        // 1. Count frequency of chars in string 1
        for (const char of str1) {
            // (lookup.get(char) || 0) handles the "undefined" first case safely
            const currentCount = lookup.get(char) || 0;
            lookup.set(char, currentCount + 1);
        }

        // 2. Decrement frequency using string 2
        for (const char of str2) {
            // If char doesn't exist or count is 0, it's not a match
            if (!lookup.has(char) || lookup.get(char)! <= 0) {
                return false;
            }
            
            const currentCount = lookup.get(char)!;
            lookup.set(char, currentCount - 1);
        }

        return true;
    }

    /**
     * PATTERN 2: SETS FOR UNIQUENESS
     * Checks if there are any duplicate arguments in a variable list.
     * * Time Complexity: O(N)
     * Space Complexity: O(N)
     */
    static hasDuplicates(...args: (string | number)[]): boolean {
        // A Set only holds unique values.
        // If we convert the array to a Set and the size shrinks, we had duplicates.
        return new Set(args).size !== args.length;
    }

    /**
     * HELPER: Generates a Frequency Map from a string or array.
     * Use this when you want to inspect counts directly.
     * Returns: Map { 'a' => 2, 'b' => 1 }
     */
    static createFrequencyMap(iterable: string | any[]): Map<string | any, number> {
        const lookup = new Map<string | any, number>();

        for (const item of iterable) {
            const count = lookup.get(item) || 0;
            lookup.set(item, count + 1);
        }

        return lookup;
    }
}

