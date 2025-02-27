<?php
namespace Waxedphp\Terminal;

use Waxedphp\Terminal\Parsers\PosixCommandLineParser;

class Setter extends \Waxedphp\Waxedphp\Php\Setters\AbstractSetter {

  /**
   * @var array<mixed> $setup
   */
  private array $setup = [
  ];
  
  /**
   * allowed options
   *
   * @var array<mixed> $_allowedOptions
   */
  protected array $_allowedOptions = [
  ];

  function setValue($value) {
    $this->setup['value'] = $value;
    return $this;
  }

  function setMode($mode) {
    $this->setup['mode'] = $mode;
    return $this;
  }

  function setTheme($theme) {
    $this->setup['theme'] = $theme;
    return $this;
  }
  
  function getParser() {
    return new PosixCommandLineParser();
  }

  /**
  * value
  *
  * @param mixed $value
  * @return array<mixed>
  */
  public function value(mixed $value = null): array {
    $a = [];
    $b = $this->getArrayOfAllowedOptions();
    if (!empty($b)) {
      $a['config'] = $b;
    }
    $a['value'] = $value;
    return $a;
  }

  public function resume(string $value): array {
    $a = [
      'response' => $value,
      'resume' => true,
    ];
    return $a;
  }
  
  public function parse(string $command) {
    $prs = $this->getParser();
    return $prs->getIt($command);    
  }

}
