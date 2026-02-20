export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 text-zinc-900 dark:text-zinc-50">
      <h1 className="mb-6 text-2xl font-bold">서비스 이용약관</h1>
      <div className="flex flex-col gap-8 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">제1조 (목적)</h2>
          <p>
            본 약관은 몽냥(이하 &quot;회사&quot;)이 제공하는 서비스의 이용과 관련하여 회사와 회원 간의 권리, 의무 및
            책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">제2조 (용어의 정의)</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              &quot;서비스&quot;라 함은 구현되는 단말기(PC, TV, 휴대형단말기 등의 각종 유무선 장치를 포함)와 상관없이
              회원이 이용할 수 있는 제반 서비스를 의미합니다.
            </li>
            <li>
              &quot;회원&quot;이라 함은 회사의 서비스에 접속하여 본 약관에 따라 회사와 이용계약을 체결하고 회사가
              제공하는 서비스를 이용하는 고객을 말합니다.
            </li>
            <li>
              &quot;게시물&quot;이라 함은 회원이 서비스를 이용함에 있어 서비스상에 게시한
              부호ㆍ문자ㆍ음성ㆍ음향ㆍ화상ㆍ동영상 등의 정보 형태의 글, 사진, 동영상 및 각종 파일과 링크 등을
              의미합니다.
            </li>
          </ul>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">제3조 (약관의 효력 및 변경)</h2>
          <p>
            회사는 본 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다. 회사는 관련 법령을 위배하지
            않는 범위에서 본 약관을 개정할 수 있으며, 개정된 약관은 공지사항을 통해 공지함으로써 효력이 발생합니다.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">제4조 (회원가입)</h2>
          <p>
            이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 본 약관에 동의한다는 의사표시를 함으로써
            회원가입을 신청합니다. 회사는 이러한 신청에 대하여 원칙적으로 승낙합니다. 다만, 실명이 아니거나 타인의
            명의를 이용한 경우 등에는 승낙을 하지 않을 수 있습니다.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">제5조 (개인정보보호)</h2>
          <p>
            회사는 관련 법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 사용에
            대해서는 관련 법령 및 회사의 개인정보처리방침이 적용됩니다.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            제6조 (회원의 아이디 및 비밀번호의 관리에 대한 의무)
          </h2>
          <p>
            회원의 아이디와 비밀번호에 관한 관리책임은 회원에게 있으며, 이를 제3자가 이용하도록 하여서는 안 됩니다.
            회원은 아이디 및 비밀번호가 도용되거나 제3자가 사용하고 있음을 인지한 경우에는 이를 즉시 회사에 통지하고
            회사의 안내에 따라야 합니다.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">제7조 (게시물의 저작권)</h2>
          <p>
            회원이 서비스 내에 게시한 게시물의 저작권은 해당 게시물의 저작자에게 귀속됩니다. 다만, 회사는 서비스의 운영,
            전시, 전송, 배포, 홍보의 목적으로 회원의 별도 허락 없이 무상으로 저작권법에 규정된 공정한 관행에 합치되게
            합리적인 범위 내에서 회원이 등록한 게시물을 사용할 수 있습니다.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">제8조 (계약 해지 및 이용 제한)</h2>
          <p>
            회원은 언제든지 서비스 내 정보 관리 메뉴 등을 통하여 이용계약 해지 신청을 할 수 있으며, 회사는 관련 법령
            등이 정하는 바에 따라 이를 즉시 처리하여야 합니다. 회원이 계약을 해지하는 경우, 회원이 작성한 게시물 일체는
            삭제됩니다.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">제9조 (면책 조항)</h2>
          <p>
            회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한
            책임이 면제됩니다. 또한, 회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.
          </p>
        </section>
        <section className="mt-8 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <p className="text-xs text-zinc-500">본 약관은 2026년 2월 20일부터 시행됩니다.</p>
        </section>
      </div>
    </div>
  );
}
