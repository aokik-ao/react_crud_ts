<?php

class Categories extends MY_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function select_categories()
    {
        $this->db->select('id');
        $this->db->select('name');
        $this->db->from('public.categories');
        $this->db->order_by("id", "ASC");
        // TODO 余裕があったらログを出す、ログを出す方法を調べるところから
        $query = $this->db->get();
        return $query->result();
    }
}
