<?php
namespace necoapps\matrixsnap;
use Craft;
use craft\base\Plugin;

class MatrixSnap extends Plugin
{
	public static $plugin;

	public function init()
	{
		parent::init();
		self::$plugin = $this;

		$user = Craft::$app->getUser();
		$request = Craft::$app->getRequest();

		Craft::info(
			Craft::t(
				'matrix-snap',
				'{name} plugin loaded',
				['name' => $this->name]
			),
			__METHOD__
		);

		if (!$user || !$user->id || !$request->getIsCpRequest() || $request->getIsConsoleRequest()) {
			return;
		}

		$segments = Craft::$app->request->getSegments();

		if (count($segments) === 3 && $segments[0] === 'entries') {
			Craft::$app->getView()->registerAssetBundle(MatrixSnapBundle::class);
		}
	}
}