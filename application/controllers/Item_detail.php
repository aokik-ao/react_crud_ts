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
        $params = json_decode(file_get_contents('php://input'), true);
        $id = $params['id'];
        // 存在チェックする
        $target_item = $this->items->select_items_by_key($id);

        if (!$target_item) {
            // 存在なしなので失敗を返す
            $this->response([
                'status' => false,
                'error_messages' => '該当データが存在していません。'
            ], RestController::HTTP_BAD_REQUEST);
        } else {
            // 存在しているので削除する
            $this->items->delele_item($id);
            $this->response([
                'status' => true,
            ], RestController::HTTP_OK);
        }
    }

    /**
     * /item_detail
     * putメソッド
     * 該当のitem情報を更新する
     * @return json
     */
    public function index_put()
    {
        $params = json_decode(file_get_contents('php://input'), true);

        $id = $params['id'];
        // 存在チェックする
        $target_item = $this->items->select_items_by_key($id);

        // カンマ区切りで文字列を作成する、ts側で改行を入れてalert表示する
        $error_messages = '';

        if (!$target_item) {
            // 存在なしなので失敗を返す
            $this->response([
                'status' => false,
                'error_messages' => '該当データが存在していません。'
            ], RestController::HTTP_BAD_REQUEST);
        } else {
            // 更新済みか確認する
            if ($target_item->update_date != $params['update_date']) {
                $error_messages = '他で更新されています。';
                $this->response([
                    'status' => false,
                    'error_messages' => $error_messages
                ], RestController::HTTP_BAD_REQUEST);
            }

            // バリデーションをする
            $error_messages = $this->validation($params, $error_messages);

            if ($error_messages != '') {
                $this->response([
                    'status' => false,
                    'error_messages' => $error_messages
                ], RestController::HTTP_BAD_REQUEST);
            } else {
                // 更新をする
                $this->items->update_item($params);
                $this->response([
                    'status' => true,
                ], RestController::HTTP_OK);
            }
        }
    }

    /**
     * /item_detail
     * postメソッド
     * 新規のitem情報を登録する
     * @return json
     */
    public function index_post()
    {
        $params = json_decode(file_get_contents('php://input'), true);
        $error_messages = '';

        // バリデーションをする
        $error_messages = $this->validation($params, $error_messages);

        if ($error_messages != '') {
            $this->response([
                'status' => false,
                'error_messages' => $error_messages
            ], RestController::HTTP_BAD_REQUEST);
        } else {
            // 登録をする
            $this->items->insert_item($params);
            $this->response([
                'status' => true,
            ], RestController::HTTP_OK);
        }
    }

    private function validation($params, $error_messages)
    {
        $comma = ',';
        if ($params['name'] == "") {
            $error_messages .= '商品名を入力してください。' . $comma;
        } else if (mb_strlen($params['name']) > 30) {
            $error_messages .= '商品名は30文字以内で入力してください。' . $comma;
        }
        // 金額
        if ($params['price'] == "") {
            $error_messages .= '金額を入力してください。' . $comma;
        } elseif (!preg_match("/^[0-9]+$/", $params['price'])) {
            $error_messages .= '金額は半角整数で入力してください。' . $comma;
        }
        // ポイント還元率
        if ($params['point_ratio'] == "") {
            $error_messages .= 'ポイント還元率を選択してください。' . $comma;
        }

        return $error_messages;
    }
}
