export default function TableSkeleton() {
  return (
            <table className="table w-full max-w-4xl">
            <thead>
                <tr>
                    <th><div className="skeleton h-5 rounded-md"></div></th>
                    <th><div className="skeleton h-5 rounded-md"></div></th>
                    <th><div className="skeleton h-5 rounded-md"></div></th>
                    <th><div className="skeleton h-5 rounded-md"></div></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th><div className="skeleton h-5 rounded-md"></div></th>
                    <td><div className="skeleton h-5 rounded-md"></div></td>
                    <td><div className="skeleton h-5 rounded-md"></div></td>
                    <td><div className="skeleton h-5 rounded-md"></div></td>
                </tr>
                <tr>
                    <th><div className="skeleton h-5 rounded-md"></div></th>
                    <td><div className="skeleton h-5 rounded-md"></div></td>
                    <td><div className="skeleton h-5 rounded-md"></div></td>
                    <td><div className="skeleton h-5 rounded-md"></div></td>
                </tr>
                <tr>
                    <th><div className="skeleton h-5 rounded-md"></div></th>
                    <td><div className="skeleton h-5 rounded-md"></div></td>
                    <td><div className="skeleton h-5 rounded-md"></div></td>
                    <td><div className="skeleton h-5 rounded-md"></div></td>
                </tr>
                <tr>
                    <th><div className="skeleton h-5 rounded-md"></div></th>
                    <td><div className="skeleton h-5 rounded-md"></div></td>
                    <td><div className="skeleton h-5 rounded-md"></div></td>
                    <td><div className="skeleton h-5 rounded-md"></div></td>
                </tr>
            </tbody>
        </table>
  )
}