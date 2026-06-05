"use client";

export default function DeleteButton({
  action,
  id,
  redirectTo,
}: {
  action: (formData: FormData) => Promise<void>;
  id: string;
  redirectTo?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("정말 삭제하시겠습니까?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      {redirectTo && <input type="hidden" name="redirectTo" value={redirectTo} />}
      <button
        type="submit"
        className="text-red-600 hover:text-red-800 text-sm"
      >
        Delete
      </button>
    </form>
  );
}
