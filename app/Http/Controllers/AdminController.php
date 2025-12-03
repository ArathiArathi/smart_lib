<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function listAdmins(Request $request)
    {
        $query = User::where('is_admin', true);

        if ($request->has('role_id')) {
            $query->where('role_id', $request->role_id);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%$search%")
                ->orWhere('email', 'like', "%$search%");
        }

        return response()->json($query->with('role')->paginate(20));
    }

    public function createAdmin(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'role_id' => 'required|exists:roles,id',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role_id' => $validated['role_id'],
            'is_admin' => true,
        ]);

        return response()->json([
            'message' => 'Admin created successfully',
            'user' => $user->load('role'),
        ], 201);
    }

    public function updateAdminRole(Request $request, User $user)
    {
        $validated = $request->validate([
            'role_id' => 'required|exists:roles,id',
        ]);

        $user->update($validated);

        return response()->json(['message' => 'Admin role updated successfully', 'user' => $user->load('role')]);
    }

    public function toggleAdminStatus(User $user)
    {
        $user->update(['is_admin' => !$user->is_admin]);

        return response()->json([
            'message' => 'Admin status updated',
            'user' => $user,
        ]);
    }

    public function listRoles()
    {
        return response()->json(Role::with('permissions')->get());
    }

    public function createRole(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|unique:roles|string',
            'description' => 'nullable|string',
            'permission_ids' => 'nullable|array',
        ]);

        $role = Role::create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
        ]);

        if ($validated['permission_ids'] ?? null) {
            $role->permissions()->sync($validated['permission_ids']);
        }

        return response()->json([
            'message' => 'Role created successfully',
            'role' => $role->load('permissions'),
        ], 201);
    }

    public function updateRole(Request $request, Role $role)
    {
        $validated = $request->validate([
            'name' => 'string|unique:roles,name,' . $role->id,
            'description' => 'nullable|string',
            'permission_ids' => 'nullable|array',
        ]);

        $role->update($validated);

        if ($validated['permission_ids'] ?? null) {
            $role->permissions()->sync($validated['permission_ids']);
        }

        return response()->json($role->load('permissions'));
    }

    public function getSettings()
    {
        return response()->json([
            'max_books_per_student' => 5,
            'max_loan_days' => 14,
            'fine_per_day' => 10,
            'auto_reminder_days' => 3,
        ]);
    }

    public function updateSettings(Request $request)
    {
        $validated = $request->validate([
            'max_books_per_student' => 'nullable|integer|min:1',
            'max_loan_days' => 'nullable|integer|min:1',
            'fine_per_day' => 'nullable|numeric|min:0',
            'auto_reminder_days' => 'nullable|integer|min:1',
        ]);

        return response()->json([
            'message' => 'Settings updated successfully',
            'settings' => $validated,
        ]);
    }
}
