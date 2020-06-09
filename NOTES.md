# Notes

## Order of Operations
I want to implement the first idea down below, among others. However, in order for it to fully work, I need to have the api/v1/concoctions/:id route working.

So, here's the intended order of operations (subject to change):
1. Wireframe the app on Figma

2. Based on that, translate that into HTML and CSS
  * Some of the page elements will need to be inside of containers and/or wrappers
  * I ought to make use of CSS Grid
  * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Box_Alignment_in_CSS_Grid_Layout
  * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout
  * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout

3. Build out the api/v1/concoctions/:id route, and figure out how/when to display the data
  * Initially, I want to show the last Concoction when the user loads the page
  * I will later replace the default view with the "New Concoction" form
  * From the ConcoctionsController: render status: :not_found (Make sure to incorporate this into the JS file!)
  * I might use this image: https://pixabay.com/vectors/monitor-404-error-problem-page-1350918/
  * Also, here's how to merge a branch with a commit message: https://stackoverflow.com/questions/15006554/git-merge-branch-and-use-meaningful-merge-commit-message

4. Build out the route, form, button, JS, etc. for creating and displaying a new concoction
  * That form will be shown by default, with the "New Concoction" button disabled.
  * I want to replace the form with the new concoction or a saved concoction, so that may need to be inside of a "div" element

5. Build out the list of Saved Concoctions that will each be linked to a concoction, along with the needed JavaScript

6. Refactor with OOJS, DRY, CSS frameworks, etc

7. Implement stretch goals (especially that "I'm a teapot" HTTP status)

## Ideas
I want to add a "select" list like this, but for saved concoctions:
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select

I may need to add a label to it (but I'd rather not use one).
The idea is when a user chooses a concoction (with a data-concoction-id and name), that will get rendered.
When the DOM is loaded, add "option" tags to it, each with a linked concoction.