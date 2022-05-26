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
        $url_list = explode('/', current_url());
        $id = $url_list[count($url_list) - 1];
        $data = $this->items->select_items_by_key($id);
        $this->response($data, RestController::HTTP_OK);
    }

    /**
     * /item_detail
     * deleteメソッド
     * 該当のitem情報を削除する
     * @return json
     */
    public function index_delete()
    {
        $param = json_decode(file_get_contents('php://input'), true);
        $id = $param["id"];
        // 存在チェックする
        $target_item = $this->items->select_items_by_key($id);

        if (!$target_item) {
            // 存在なしなので失敗を返す
            $this->response([
                'status' => false,
                'message' => 'no exist'
            ], RestController::HTTP_INTERNAL_ERROR);
        } else {
            // 存在しているので削除する
            $this->items->delele_item($id);
            $this->response([
                'status' => true,
            ], RestController::HTTP_OK);
        }
    }
}
