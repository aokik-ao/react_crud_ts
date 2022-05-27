<?php

class Items extends MY_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function select_items()
    {
        $this->db->select('i.id');
        $this->db->select('i.category_id');
        $this->db->select('c.name as category_name');
        $this->db->select('i.name');
        $this->db->select('i.price');
        $this->db->select('i.point_ratio');
        $this->db->select('i.reserve_only_flag');
        $this->db->select('i.regist_date');
        $this->db->select('i.update_date');
        $this->db->from('public.items as i');
        $this->db->join('public.categories as c', 'i.category_id = c.id', 'left');
        $this->db->order_by("i.id", "ASC");
        $query = $this->db->get();
        return $query->result();
    }

    public function select_items_by_key($id)
    {
        $this->db->select('i.id');
        $this->db->select('i.category_id');
        $this->db->select('c.name as category_name');
        $this->db->select('i.name');
        $this->db->select('i.price');
        $this->db->select('i.point_ratio');
        $this->db->select('i.reserve_only_flag');
        $this->db->select('i.regist_date');
        $this->db->select('i.update_date');
        $this->db->from('public.items as i');
        $this->db->where('i.id', $id);
        $this->db->join('public.categories as c', 'i.category_id = c.id', 'left');
        $query = $this->db->get();
        return $query->row();
    }

    public function delele_item($id)
    {
        $this->db->delete('public.items', array('id' => $id));
    }

    public function update_item($params)
    {
        $this->db->set('category_id', $params['category_id']);
        $this->db->set('name', $params['name']);
        $this->db->set('price', $params['price']);
        $this->db->set('point_ratio', $params['point_ratio']);
        $this->db->set('reserve_only_flag', $params['reserve_only_flag']);
        $this->db->set('update_date', 'now()');
        $this->db->where('id', $params['id']);
        $this->db->update('public.items');
    }
}
