<?php
namespace necoapps\matrixsnap;
use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

class MatrixSnapBundle extends AssetBundle
{
	public function init()
	{
		$this->sourcePath = '@necoapps/matrixsnap/resources';
		$this->depends = [CpAsset::class];
		$this->css = ['matrix-snap.min.css'];
		$this->js = ['matrix-snap.min.js'];
		parent::init();
	}
}