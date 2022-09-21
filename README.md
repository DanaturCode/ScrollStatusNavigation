# Scroll Status Navigation

This is a small script that is checking the page's scroll position to indicate how much the user read of the sections.

It also includes a mobile navigation with a [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver?retiredLocale=de). The mobile navigation is build when you open it and get's destroyed when you close it. The observer checks if there are changes in the DOM and runs the scroll script. This is sometimes necessary if you use this in frameworks and other environments.
