<?php
defined('BASEPATH') or exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;


class Item_detail extends RestController
{
    function __construct()
    {
        parent::__construct();
        $this->load->helper('url');
        $this->load->model('categories');
        $this->load->model('items');
    }

    /**
     * /item_detail
     * getメソッド
     * 該当のitem情報を返す
     * @return json
     */
    public function index_get()
    {
        $a = $_GET("id");
        $url_list = explode('/',current_url());
        $id = $url_list[count($url_list) - 1];
        $data = $this->items->select_items_by_key($id);
        $this->response($data, RestController::HTTP_OK);
    }
}
