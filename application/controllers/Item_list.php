<?php
defined('BASEPATH') or exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;


class Item_list extends RestController
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('items');
    }

    /**
     * /item_list
     * getメソッド
     * itemを全部返す
     * @return json
     */
    public function index_get()
    {
        $data = $this->items->select_items();
        $this->response($data, RestController::HTTP_OK);
    }
}
