# Create a Trie Search Tree

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/data-structures/create-a-trie-search-tree)

Here we will move on from binary search trees and take a look at another type of
tree structure called a trie. A trie is an ordered search tree commonly used to
hold strings, or more generically associative arrays or dynamic datasets in
which the keys are strings. They are very good at storing sets of data when many
keys will have overlapping prefixes, for example, all the words in a dictionary.
Unlike a binary tree, nodes are not associated with actual values. Instead, the
path to a node represents a specific key. For instance, if we wanted to store
the string code in a trie, we would have four nodes, one for each letter: c — o
— d — e. Following that path through all these nodes will then create code as a
string — that path is the key we stored. Then, if we wanted to add the string
coding, it would share the first three nodes of code before branching away after
the d. In this way, large datasets can be stored very compactly. In addition,
search can be very quick because it is effectively limited to the length of the
string you are storing. Furthermore, unlike binary trees a node can store any
number of child nodes. As you might have guessed from the above example, some
metadata is commonly stored at nodes that hold the end of a key so that on later
traversals that key can still be retrieved. For instance, if we added codes in
our example above we would need some way to know that the e in code represents
the end of a key that was previously entered. Otherwise, this information would
effectively be lost when we add codes.
