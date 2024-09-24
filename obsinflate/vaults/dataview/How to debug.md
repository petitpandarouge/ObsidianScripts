- Hit `Ctr + ,`to open the `Configuration Panel`
	1. Open the `Dataview` configuration,
	2. Activate the `Enable JavaScript queries` option.

![[Pasted image 20240921200328.png]]

- Close the `Configuration Panel`.

>[!warning] The view must be executed at least once to be available in the `Developer Tools`.

- Into the `Views` markdown file, write the dataview code block calling the view.

```
`` dataviewjs
dv.view("scripts/helloworld", {name : "me"});
``
```

- Open the `Developer Tools` using `Ctrl + Shift + I` shortcut.
- In the `Page` tab, search for your script under the `obsinflate_dv_view_<viewName>` directory.

![[Pasted image 20240922193136.png]]

- Add a break point where you want to hit.

![[Pasted image 20240922193214.png]]

- Run again your view. You'll see the code being hit.

![[Pasted image 20240922193307.png]]


