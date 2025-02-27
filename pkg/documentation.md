# Terminal

[https://terminal.jcubic.pl/]

MIT license

---

### PHP:

```php
  use \Waxedphp\Terminal\Setter as Terminal;
  
  $obj = new Terminal($this->waxed);

  $this->waxed->pick('section1')->display([
     'termaction' => 'terminal/request',
     'termname'=> 'terminalis',
  ],$this->tpl.'/terminal');   

```


Request from terminal is solved on server and returned:
```php
  $terminal = new Terminal($this->waxed);
  $cmd = $terminal->parse($data['command']);
  //do some logic with parsed command...
  $result = json_encode($cmd, JSON_PRETTY_PRINT);
  //...
  $this->waxed->pick('section1')->inspire([
     'terminalis' => $terminal->resume($result),
  ]); 

```
---

### HTML:

```html

<div class="waxed-terminal" 
data-url="{{:ajax}}" data-action="{{termaction}}" data-name="{{termname}}" 
data-greetings="{{termgreetings}}" data-prompt="{{termprompt}}"
style="height:500px;width:100%;" ></div>


```
---
---


