<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class index extends MY_Controller {
    function __construct()
    {
        parent::__construct();
        $this->load->helper('url');
    }

	public function index()
	{
        // ビルドファイルを自動取得する処理
        $asset_json  = file_get_contents('./build/asset-manifest.json');
        $asset = json_decode($asset_json, true);
        $base = '/build';
        $file_paths = array();
        foreach($asset['files'] as $key => $filename){
            if($key === 'main.css'){
                $file_paths['main_css'] = $base . $filename;
            }
            if($key === 'main.js'){
                $file_paths['main_js'] = $base . $filename;
            }
        }

		$this->load->view('index', $file_paths);
	}
}
