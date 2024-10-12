from flask import request, jsonify
from .services import MembersService
from . import members_bp


@members_bp.route('', methods=['GET'])
def get_members():
    return MembersService.get_members(request.args)

@members_bp.route('', methods=['POST'])
def add_member():
    return MembersService.add_member(request.form, request.files)

@members_bp.route('/<member_id>', methods=['GET'])
def get_member_detail(member_id):
    return MembersService.get_member_detail(member_id)