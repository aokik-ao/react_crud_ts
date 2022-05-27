<?php
defined('BASEPATH') or exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;


class Item_categories extends RestController
{
    function __construct()
    {
        parent::__construct();
        $this->load->helper('url');
        $this->load->model('categories');
    }

    /**
     * /item_categories
     * getメソッド
     * 全てのcategory情報を返す
     * @return json
     */
    public function index_get()
    {
        $data = $this->categories->select_categories();
        $empty_object = new stdClass();
        $empty_object->id = "";
        $empty_object->name = "";
        array_unshift($data, $empty_object);
        $this->response($data, RestController::HTTP_OK);
    }
}
