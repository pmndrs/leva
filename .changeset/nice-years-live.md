---
'leva': patch
---

Fix a an issue where a string starting with a number would be considered as a number with a potentially long unit. Now we consider a string as a number when its suffix is less than 4 characters long.
