Expected behaviour: 
- The page opens on the index.html page. 
- From here, you can navigate to second.html
- If the connection to the server is lost (server is killed or page is forced offline through devtools):
  - index.html should still be available
  - When navigating to second.html (or refreshing that page) a "this page is not available offline" page should be shown. 