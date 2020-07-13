# Notes

## Order of Operations
I want to implement the first idea down below, among others. However, in order for it to fully work, I need to have the api/v1/concoctions/:id route working.

So, here's the intended order of operations (subject to change):
1. Wireframe the app on Figma (Update: DONE!)

2. Based on that, translate that into HTML and CSS (Update: DONE!)
  * Some of the page elements will need to be inside of containers and/or wrappers
  * I ought to make use of CSS Grid
  * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Box_Alignment_in_CSS_Grid_Layout
  * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout
  * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout

3. Build out the api/v1/concoctions/:id route, and figure out how/when to display the data
  * Initially, I want to show the last Concoction when the user loads the page (Update: DONE!)
  * I will later replace the default view with the "New Concoction" form (Update: DONE!)
  * From the ConcoctionsController: render status: :not_found (Make sure to incorporate this into the JS file!) (Update: DONE!)
  * I might use this image: https://pixabay.com/vectors/monitor-404-error-problem-page-1350918/ (Update: I used a different image instead.)
  * Also, here's how to merge a branch with a commit message: https://stackoverflow.com/questions/15006554/git-merge-branch-and-use-meaningful-merge-commit-message
    * Update: That won't work, due to fast-forwarding. This explains it: https://git-scm.com/docs/git-merge#Documentation/git-merge.txt---ff

4. Build out the route, form, button, JS, etc. for creating and displaying a new concoction (Update: DONE!)
  * That form will be shown by default, with the "New Concoction" button disabled.
  * I want to replace the form with the new concoction or a saved concoction, so that may need to be inside of a "div" element

5. Build out the list of Saved Concoctions that will each be linked to a concoction, along with the needed JavaScript (Update: DONE!)

6. Refactor with OOJS, DRY, CSS frameworks, etc (Update: Done, but the CSS framework is now a stretch goal for a future version.)

7. Implement stretch goals (especially that "I'm a teapot" HTTP status) (Update: Partially done!)

## Ideas
* What if instead of adding background colors to the "Saved Concoctions List" and the "New Concoction" button, I made their wrapper light brown (so it extends to the bottom of the page), and then made the list and button white with light brown text? Would THAT work?
* If the user decides to click on a Saved Concoction while filling out the New Concoction form, maybe they should be given a warning message that asks them if they're sure they want to do this.
* See the NOTES.md file in the Rails backend API for more ideas and stretch goals.

**IMPORTANT!** I may want to undo that `width: 100%;` setting on the `select` CSS rule; it cuts off any `<option>` text that is longer than its container. Also, I need to play with the form styles:

<!-- #main-container form div:last-child {
  display: flex;
  justify-content: center;
}

#main-container button { /* I may not want this. */
  background-color: #A65F40;
  color: white;
} -->

I want to add a "select" list like this, but for saved concoctions (Update: DONE!):
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select

I may need to add a label to it (but I'd rather not use one).
The idea is when a user chooses a concoction (with a data-concoction-id and name), that will get rendered.
When the DOM is loaded, add "option" tags to it, each with a linked concoction.

Later, I want to refactor how a concoction is displayed:
  * If no coffees, creamers, other ingredients, etc. were added to the concoction, don't display the label for them (Update: DONE!)
  * Else if only ONE coffee, creamer, etc. was added to the concoction, the label should be singular (Coffee:)
  * Else, the label should be plural (Coffees:)

According to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#Styling_with_CSS, `<select>` elements are "...notoriously difficult to style productively with CSS".
As a stretch goal, I could make my own `<select>`-like `<div>` element for the list of Concoctions, and add additional styles like Flex centering, borders, list elements that don't overlap their container, etc.

### Notes for the `displayConcoction()` function:
Goal: HTML that looks something like this (not necessarily concoction #1). (Update: DONE!)
I may want to style this as a table or with CSS Grid instead - I need to separate the labels from the content.
```
<div id="main-container">
  <h2>Regular Mocha</h2>
  <ul>
    Coffee(s):
    <li>1 tsp Folger's Instant</li>
    <li>t tsp Yuban Instant</li>
  </ul>
  <ul>
    Liquid(s):
    <li>8 fl oz hot milk</li>
  </ul>
  <ul>
    Sweetener(s):
    <li>1 tsp sugar</li>
    <li>1/2 packet Sweet and Low</li>
  </ul>
  <ul>Creamer(s):
    <li>1 tsp vanilla creamer</li>
  </ul>
  <ul>Additional Ingredients:
    <li>1 tsp chocolate syrup</li>
    <li>1 pinch cinnamon</li>
  </ul>
  <p>Instructions: Lorem Ipsum Dolor Sit Amet</p>
  <p>Notes: My notes about this coffee concoction</p>
</div>
```

## Bug Notes
* When I create a new Concoction, its name gets added to the bottom of the Saved Concoctions list. However, the list does not get re-sorted until I refresh the page.