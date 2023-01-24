# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
I moved event validation at the top to return if there is no event passed to avoid running unnecessary checks. Instead of defining an undefined candidate, I took partitionKey attribute in the event as the initial value and based on partitionKey is there or not, grouped related checks in code blocks. Hashed candidate if required and returned the value. Since related conditions are grouped in separate blocks, logic is more readable, reasonable, and understandable. I didn't create separate functions as it was not specified and not required in my opinion but I did refactor the function with the separation of concerns principle in mind.